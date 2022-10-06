const axios = require('axios');
var parseString = require('xml2js').parseString;

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

let pricingData = []
// variable coincides with system variable UserName, used UserNameNameCheap
let namecheap_uri = 
    `https://api.sandbox.namecheap.com/xml.response?ApiUser=${process.env.ApiUser}&ApiKey=${process.env.ApiKey}&UserName=${process.env.UserNameNameCheap}&ClientIp=${process.env.ClientIp}&Command=namecheap.users.getPricing&ProductType=DOMAIN&ProductName=vote`

console.log(namecheap_uri)

axios.get(namecheap_uri)
.then(response => {
// console.log(response.data);
parseString(response.data, function (err, result) {
    console.dir(result);
    // pricingData = result.ApiResponse.CommandResponse[0].UserGetPricingResult[0].ProductType[0].ProductCategory
    // console.dir(pricingData)
    console.dir(result.ApiResponse.CommandResponse);
    console.log("*******************************")
    // console.dir(result.ApiResponse.CommandResponse[0].UserGetPricingResult[0].ProductType[0].ProductCategory.length);
    // console.dir(result.ApiResponse.CommandResponse[0].UserGetPricingResult[0].ProductType[0].ProductCategory[0].$);
    // console.dir(result.ApiResponse.CommandResponse[0].UserGetPricingResult[0].ProductType[0].ProductCategory[0].Product);
    console.dir(result.ApiResponse.Errors[0]);
    // console.dir(result.ApiResponse.Errors[0].Error);
});

})
.catch(error => {
console.log(error);
});
