const { despedirController} = require("../../controllers/despedir.controller");
const router = require("express").Router();

router.get("/", despedirController);

module.exports = router;