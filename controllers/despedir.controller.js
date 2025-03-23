const {despedir} = require("../service/despedir.service");

const despedirController = (req, res)=>{
    const mensajeDespido = despedir();
    res.json(mensajeDespido);
}
