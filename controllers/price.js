const axios = require('axios');
var parseString = require('xml2js').parseString;
var tld_priority = require('../domains/tld_priority_list.json');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const checkPrice = async (domainName) => {
    let single_tld = []
    let pricingData = [] // CRUDE this list saves the response from api of 4 types of different prices
    let namecheap_uri = 
    `https://api.sandbox.namecheap.com/xml.response?ApiUser=${process.env.ApiUser}&ApiKey=${process.env.ApiKey}&UserName=${process.env.UserNameNameCheap}&ClientIp=${process.env.ClientIp}&Command=namecheap.users.getPricing&ProductType=DOMAIN&ProductName=${domainName}`

    try {
        const priceOne = await axios.get(namecheap_uri)
        const parsingPrices = await parseString(priceOne.data, function (err, result) {
                // console.dir(result);
                if (result.ApiResponse.$.Status=='OK') {
                    pricingData = result.ApiResponse.CommandResponse[0].UserGetPricingResult[0].ProductType[0].ProductCategory
                    pricingData.map((i)=>{
                        let val = {
                            ActionName: i.$.Name,
                            tld: i.Product[0].$.Name,
                            data: i.Product[0].Price[0].$
                        }
                        single_tld.push(val)
                    })   
                } else {
                    let err = {
                        error: {
                            message: result.ApiResponse.Errors[0].Error[0]._ || "An error occured",
                            Number: result.ApiResponse.Errors[0].Error[0].$.Number || "Unknown Error Number"   
                        }
                    }
                    single_tld.push(err)
                }
            });
        return single_tld;

    } catch (error) {
        let err = {
            error: {
                message: error.message,
                error_level: "in catching statement"    
            }
        }
        single_tld.push(err)
        return single_tld;
    }
}

// let sample_domains_list = ['net', 'org', 'uk', 'com', 'dev', 'bz', 'biz', 'co', 'xyz', 'me', 'io', 'me']
const price_check_all = async (domains_list) => {
    let promise_domains_list = domains_list.map(domain => checkPrice(domain))
    const get_all = await Promise.all(promise_domains_list)
    // console.log(get_all)    
    return get_all
}

// main controller
const priceCheck = async (req, res) => {
    let [domain, tld] = req.body.url.split('.')
    let priority = req.body.priority
    let priority_key = `priority_${priority-1}`

    try {
        if (tld_priority.hasOwnProperty(priority_key)) {
            let priority_file = tld_priority[priority_key]
            if (priority==1) priority_file.unshift(tld)
            var pricing_data = await price_check_all(priority_file)
          
            res.status(200).json({
                domain:domain,
                tld: tld,
                priority: priority,
                pricing_data: pricing_data
            })
        
        } else { 
            res.status(200).json({
                domain:domain,
                tld: tld,
                priority: priority,
                error: "Invalid page or priority value"
            })
    
        }
    } catch (error) {
        res.status(200).json({
            domain:domain,
            tld: tld,
            priority: priority,
            error: error.message
        })
    }

}

module.exports = priceCheck
