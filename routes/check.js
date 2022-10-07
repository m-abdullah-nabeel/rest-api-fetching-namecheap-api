const express = require("express");
const router = express.Router();
const checkDomain = require("../controllers/check")

router.get('/', checkDomain)
  
module.exports = router;