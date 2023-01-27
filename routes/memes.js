const express = require("express");

const {
    generateMeme,
} = require("../controller/movies");
const router = express.Router();

router.route("/").get(generateMeme)

module.exports = router;
