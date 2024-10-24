const express = require("express");
const router = express.Router();

const PageController = require("../controllers/pageController");

router.get("/homePage", PageController.homePage);
router.get("/blog", PageController.blogPage);

module.exports = router;