const axios = require('axios');
// var parseString = require('xml2js').parseString;

// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config();
// }

// const checkPrice = async (domainName, CollectionList) => {
//     let single_tld = []
//     let pricingData = []
//     let namecheap_uri = 
//     `https://api.sandbox.namecheap.com/xml.response?ApiUser=${process.env.ApiUser}&ApiKey=${process.env.ApiKey}&UserName=${process.env.UserNameNameCheap}&ClientIp=${process.env.ClientIp}&Command=namecheap.users.getPricing&ProductType=DOMAIN&ProductName=${domainName}`

//     try {
//         const priceOne = await axios.get(namecheap_uri)
//         parseString(priceOne.data, function (err, result) {
//             // console.dir(result);
//             if (result.ApiResponse.$.Status=='OK') {
//                 pricingData = result.ApiResponse.CommandResponse[0].UserGetPricingResult[0].ProductType[0].ProductCategory
//                 pricingData.map((i)=>{
//                     let val = {
//                         ActionName: i.$.Name,
//                         tld: i.Product[0].$.Name,
//                         data: i.Product[0].Price[0].$
//                     }
//                     single_tld.push(val)
//                     // console.log(val)
//                 })   
//                 // console.log(single_tld) 
//                 // return single_tld;
//                 CollectionList.push(single_tld)
//             } else {
//                 let err = {
//                     error: {
//                         message: result.ApiResponse.Errors[0].Error[0]._,
//                         Number: result.ApiResponse.Errors[0].Error[0].$.Number    
//                     }
//                 }
//                 single_tld.push(err)
//                 // return single_tld;
//                 CollectionList.push(single_tld)
//             }
//         });

//     } catch (error) {
//         // console.log(error);
//         let err = {
//             error: {
//                 message: error.message,
//                 error_level: "in catching statement"    
//             }
//         }
//         single_tld.push(err)
//         // return single_tld;
//         CollectionList.push(single_tld)
//     }
// }

// var checkingReturn = []



// checkPrice('com', checkingReturn)

// const checkAgain = async () => {
//     await checkPrice('com', checkingReturn)
//     await checkPrice('dev', checkingReturn)
//     await checkPrice('org', checkingReturn)
//     await console.log(checkingReturn)
// }

// checkAgain()

let num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// let num = [1, 9, 10]
const fetchOne = async (n) => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/todos/${n}`)
    // console.log(res.data)
    return res.data
}


// const final = async () => {
//     const get_all = await Promise.all([fetchOne(1), fetchOne(2), fetchOne(3)])
//     console.log(get_all)    
// }

let listed = num.map(number => fetchOne(number))

console.log(listed)

const final = async () => {
    const get_all = await Promise.all(listed)
    console.log(get_all)    
}


final()
// fetchOne(1)






























// axios.get(namecheap_uri)
// .then(response => {
// parseString(response.data, function (err, result) {
//     // console.dir(result);
//     let single_tld = []
//     if (result.ApiResponse.$.Status=='OK') {
//         pricingData = result.ApiResponse.CommandResponse[0].UserGetPricingResult[0].ProductType[0].ProductCategory
//         pricingData.map((i)=>{
//             let val = {
//                 ActionName: i.$.Name,
//                 tld: i.Product[0].$.Name,
//                 data: i.Product[0].Price[0].$
//             }
//             single_tld.push(val)
//             // console.log(val)
//         })   
//         console.log(single_tld) 
//     } else {
//         let err = {
//             error: {
//                 message: result.ApiResponse.Errors[0].Error[0]._,
//                 Number: result.ApiResponse.Errors[0].Error[0].$.Number    
//             }
//         }
//         single_tld.push(err)
//     }
    
// });

// })
// .catch(error => {
//     console.log(error);
//     let err = {
//         error: {
//             message: error.message,
//             error_level: "in catching statement"    
//         }
//     }
//     single_tld.push(err)
// });
