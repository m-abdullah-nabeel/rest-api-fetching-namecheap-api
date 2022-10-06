const express = require("express");
const router = express.Router();
var price_check = require("../price_check");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

router.get('/', async (req, res) => {
    let sample_domains_list = ['net', 'org', 'uk', 'com', 'dev', 'bz', 'biz', 'co', 'xyz', 'me', 'io', 'me']
    var actual = await price_check(sample_domains_list)
  
    res.status(200).json({
        data: actual,
    })
  
})
  
module.exports = router;