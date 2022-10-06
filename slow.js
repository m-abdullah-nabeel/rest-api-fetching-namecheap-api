const axios = require('axios');
var parseString = require('xml2js').parseString;

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

let pricingData = []
// variable coincides with system variable UserName, used UserNameNameCheap
let namecheap_uri = 
    `https://api.sandbox.namecheap.com/xml.response?ApiUser=${process.env.ApiUser}&ApiKey=${process.env.ApiKey}&UserName=${process.env.UserNameNameCheap}&ClientIp=${process.env.ClientIp}&Command=namecheap.users.getPricing&ProductType=DOMAIN&ProductName=vote`

// console.log(namecheap_uri)

axios.get(namecheap_uri)
.then(response => {
// console.log(response.data);
parseString(response.data, function (err, result) {
    // console.dir(result);
    pricingData = result.ApiResponse.CommandResponse[0].UserGetPricingResult[0].ProductType[0].ProductCategory
    // console.dir(pricingData)
    pricingData.map((i)=>{
        let val = {
            ActionName: i.$.Name,
            tld: i.Product[0].$.Name,
            data: i.Product[0].Price[0].$
        }
        console.log(val)
        // console.log(i.$.Name)
        // console.log(i.Product[0].$.Name)
        // console.log(i.Product[0].Price[0].$)
        // console.log("*******************************")
        // console.log()
    })

    console.log("*******************************")
    console.log("*******************************")
    // console.dir(result.ApiResponse.CommandResponse[0].UserGetPricingResult[0].ProductType[0].ProductCategory);
    // console.log("*******************************")
    console.dir(result.ApiResponse.CommandResponse[0].UserGetPricingResult[0].ProductType[0].ProductCategory[0].$);
    // console.log("*******************************")
    // console.dir(result.ApiResponse.CommandResponse[0].UserGetPricingResult[0].ProductType[0].ProductCategory[0].Product[0]);
    console.log("*******************************")
    console.dir(result.ApiResponse.CommandResponse[0].UserGetPricingResult[0].ProductType[0].ProductCategory[0].Product[0].$);
    console.log("*******************************")
    console.dir(result.ApiResponse.CommandResponse[0].UserGetPricingResult[0].ProductType[0].ProductCategory[0].Product[0].Price[0].$);
    // console.dir(result.ApiResponse.CommandResponse[0].UserGetPricingResult[0].ProductType[0].ProductCategory[0].Product);
    // Errors
    // console.dir(result.ApiResponse.Errors[0]);
    // console.dir(result.ApiResponse.Errors[0].Error);
});

})
.catch(error => {
console.log(error);
});
