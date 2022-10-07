const axios = require('axios');
var parseString = require('xml2js').parseString;

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

let mod_priority = 'us.xyz, github.com, banwara.net'
// variable coincides with system variable UserName, used UserNameNameCheap
let namecheap_uri = 
    `https://api.sandbox.namecheap.com/xml.response?ApiUser=${process.env.ApiUser}&ApiKey=${process.env.ApiKey}&UserName=${process.env.UserNameNameCheap}&Command=namecheap.domains.check&ClientIp=${process.env.ClientIp}&DomainList=${mod_priority}`

let newOne = `https://api.sandbox.namecheap.com/xml.response?ApiUser=manabeel&ApiKey=72741ab9ae40452790dce192e58c7053&UserName=manabeel&Command=namecheap.domains.check&ClientIp=39.40.58.241&DomainList=BZ,COM,ORG,NET,DE,RU,UK,ES,FR,CA,IN,NL,CLOUD,CH,INFO,BIZ,ONLINE,CO,IO,ME,US,BLOG`

console.log(namecheap_uri)

axios.get(namecheap_uri)
.then(response => {
console.log(response.data);
parseString(response.data, function (err, result) {
    console.dir(result);
    console.dir(result.ApiResponse.CommandResponse[0].DomainCheckResult[0].$);
    console.dir(result.ApiResponse.CommandResponse[0].DomainCheckResult);
});

})
.catch(error => {
console.log(error);
});

