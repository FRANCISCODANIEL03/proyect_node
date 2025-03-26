const { saludarController} = require("../../controllers/greet.controller");
const router = require("express").Router();

router.get("/", saludarController);

module.exports = router;
