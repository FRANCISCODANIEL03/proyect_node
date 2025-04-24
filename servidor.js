// Servidor Express para obtener el contenido de una URL
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/fetch-title', async (req, res) => {
  const { url } = req.query;
  try {
    const { data } = await axios.get(url);
    res.send(data);
  } catch (err) {
    res.status(500).send('Error al obtener el contenido');
  }
});

app.listen(4000, () => console.log('Proxy en http://localhost:4000'));
