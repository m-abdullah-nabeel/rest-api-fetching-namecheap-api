const axios = require('axios');
var parseString = require('xml2js').parseString;

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
                            message: result.ApiResponse.Errors[0].Error[0]._,
                            Number: result.ApiResponse.Errors[0].Error[0].$.Number    
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

let domains_list = ['net', 'org', 'uk', 'com', 'dev', 'bz', 'biz', 'co', 'xyz', 'me', 'io', 'me']

let promise_domains_list = domains_list.map(domain => checkPrice(domain))

const final = async () => {
    const get_all = await Promise.all(promise_domains_list)
    console.log(get_all)    
}

final()

// ##############################################################
// let num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// const fetchOne = async (n) => {
//     const res = await axios.get(`https://jsonplaceholder.typicode.com/todos/${n}`)
//     // console.log(res.data)
//     return res.data
// }

// let listed = num.map(number => fetchOne(number))
// console.log(listed)

// const final = async () => {
//     const get_all = await Promise.all(listed)
//     console.log(get_all)    
// }

// final()