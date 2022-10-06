var sample = require('./sample')

var parseString = require('xml2js').parseString;

parseString(sample, function (err, result) {
    // console.dir(result);
    // console.dir(result.ApiResponse.CommandResponse[0].$);
    // console.dir(result.ApiResponse.CommandResponse[0].UserGetPricingResult[0].ProductType[0].$);
    console.dir(result.ApiResponse.CommandResponse[0].UserGetPricingResult[0].ProductType[0].ProductCategory[1].Product[0].Price);
    // console.dir(result.ApiResponse.CommandResponse[0].DomainCheckResult[0].$);
});
