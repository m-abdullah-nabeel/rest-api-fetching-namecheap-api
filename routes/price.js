const express = require("express");
const router = express.Router();
var price_controller = require('../controllers/price')

// var price_check = require("../controllers/price_check");
// var tld_priority = require('../domains/tld_priority_list.json');

// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }

router.get('/', price_controller)
  
module.exports = router;