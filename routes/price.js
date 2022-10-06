const express = require("express");
const router = express.Router();
var price_check = require("../price_check");
var tld_priority = require('../domains/tld_priority_list.json');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

router.get('/', async (req, res) => {
    let [domain, tld] = req.body.url.split('.')
    let priority = req.body.priority
    let priority_key = `priority_${priority-1}`
    if (tld_priority.hasOwnProperty(priority_key)) {
        console.log("key found")
    } else { console.log("Key not found")}
    let priority_file = tld_priority[`priority_${priority-1}`]
    // hasOwnProperty
    if (priority==1) priority_file.unshift(tld)

    // for testing keep this array here 
    // let sample_domains_list = ['net', 'org', 'uk', 'com', 'dev', 'bz', 'biz', 'co', 'xyz', 'me', 'io', 'me']
    var pricing_data = await price_check(priority_file)
  
    res.status(200).json({
        domain:domain,
        tld: tld,
        priority: priority,
        priority_file: priority_file,
        pricing_data: pricing_data
    })

})
  
module.exports = router;