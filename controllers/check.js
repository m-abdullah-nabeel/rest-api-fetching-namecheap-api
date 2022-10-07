const axios = require('axios');
var parseString = require('xml2js').parseString;

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const priority1 = ['net', 'org']
const priority2 = ['uk', 'dev']
const priority3 = ['edu', 'it']
const priority4 = ['any', 'el', 'info']


const checkDomain = async (req, res) => {
    let domains_list = [];
    let pol_res = []
    let api_res = []
  
    // recieved this data
    let priority = req.body.priority
    let duration = req.body.duration
    let url = req.body.url
    const [domain, tld] = url.split('.')
    if (priority==1) priority1.unshift(tld)
    // give object as info about input of request
    var req_info = {
      url: url,
      domain: domain,
      tld: tld,
      priority: priority,
      duration: duration
    }
  
    priority_name = "priority".concat(priority)
    const add_to_list = (t) => domains_list.push(domain.concat(".", t))
    priority2.forEach(add_to_list);
  
    let mod_priority = domains_list.toString()
    let namecheap_uri = 
    `https://api.sandbox.namecheap.com/xml.response?ApiUser=${process.env.ApiUser}&ApiKey=${process.env.ApiKey}&UserName=${process.env.UserNameNameCheap}&Command=namecheap.domains.check&ClientIp=${process.env.ClientIp}&DomainList=${mod_priority}`
  
    try {
      let response = await axios.get(namecheap_uri)
      // console.log(response)
      output = parseString(response.data, function (err, result) {
        // console.dir(result);
        api_res = result
      });
  
      if (api_res.ApiResponse.$.Status=='OK') {
        let polish = api_res.ApiResponse.CommandResponse[0].DomainCheckResult
        polish.forEach((unpol)=>{
          pol_res.push(unpol['$'])
        })
    
        namecheap_metadata = {
          status: api_res.ApiResponse.$.Status,
          errors: api_res.ApiResponse.Errors,
          warnings: api_res.ApiResponse.Warnings,
          command_requested: api_res.ApiResponse.RequestedCommand,
          server: api_res.ApiResponse.Server,
          gmt_time_diff: api_res.ApiResponse.GMTTimeDifference,
          execution_time: api_res.ApiResponse.ExecutionTime
        }
    
        res.status(200).json({
          req_info: req_info,
          namecheap_metadata: namecheap_metadata,
          data: pol_res
        })
    
      } else {
        namecheap_metadata = {
          status: api_res.ApiResponse.$.Status,
          errors: api_res.ApiResponse.Errors,
          warnings: api_res.ApiResponse.Warnings,
          command_requested: api_res.ApiResponse.RequestedCommand,
          server: api_res.ApiResponse.Server,
          gmt_time_diff: api_res.ApiResponse.GMTTimeDifference,
          execution_time: api_res.ApiResponse.ExecutionTime
        }
    
        res.status(200).json({
          req_info: req_info,
          namecheap_metadata: namecheap_metadata,
          // data: pol_res
        })
  
      }
  
    } catch (error) {
      console.log(error)
      res.status(500).json({
        error: error.message,
      })
    }
}

module.exports = checkDomain