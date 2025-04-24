const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
app.use(cors());

// Función mejorada para obtener el título
const getTitleFromHTML = (html) => {
  const $ = cheerio.load(html);
  let title = $('title').text().trim();

  // Si no hay título o es genérico, intenta obtener og:title
  if (!title || title.toLowerCase() === 'video' || title.toLowerCase() === 'facebook') {
    const ogTitle = $('meta[property="og:title"]').attr('content');
    if (ogTitle) title = ogTitle.trim();
  }

  return title || 'Sin título';
};

// General
app.get('/fetch-title', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'URL no proporcionada' });

  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const title = getTitleFromHTML(response.data);
    if (!title) throw new Error('No title found');
    res.json({ title });
  } catch (err) {
    console.error('Error en /fetch-title:', err.message);
    res.status(500).json({ error: 'Error al obtener el título' });
  }
});

// YouTube específico
app.get('/youtube-title', async (req, res) => {
  const { url } = req.query;
  try {
    const { data } = await axios.get(`https://noembed.com/embed?url=${url}`);
    res.json({ title: data.title });
  } catch (err) {
    console.error('Error en /youtube-title:', err.message);
    res.status(500).json({ error: 'Error al obtener título de YouTube' });
  }
});

// TikTok
app.get('/tiktok-title', async (req, res) => {
  const { url } = req.query;
  try {
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const $ = cheerio.load(response.data);
    const title = $('meta[property="og:title"]').attr('content') || $('title').text();
    res.json({ title: title.trim() });
  } catch (err) {
    console.error('Error en /tiktok-title:', err.message);
    res.status(500).json({ error: 'Error al obtener título de TikTok' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
