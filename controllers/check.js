const axios = require('axios');
var parseString = require('xml2js').parseString;
var tld_priority = require('../domains/tld_priority_list.json');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// this route cannot be checked by status f request because the Namecheap Error code sometimes fetches correct information with it
// Say we have 20 listed domains, and one domain is not found, then error will be the status
// but for other domains the availability check will be done correctly

const checkApi = async (domain, tldomains) => {
    let pol_res = []
    let api_res = []
    let mod_priority = tldomains.map(x => domain.concat(".",x)).toString()

    let namecheap_uri = 
    `https://api.sandbox.namecheap.com/xml.response?ApiUser=${process.env.ApiUser}&ApiKey=${process.env.ApiKey}&UserName=${process.env.UserNameNameCheap}&Command=namecheap.domains.check&ClientIp=${process.env.ClientIp}&DomainList=${mod_priority}`
    // console.log(namecheap_uri)

    try {
      let response = await axios.get(namecheap_uri)
      output = parseString(response.data, function (err, result) { api_res = result});

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
      return {
          namecheap_metadata: namecheap_metadata,
          data: pol_res
      }
    } catch (error) {
        return {
            error: error.message,
        }
    }

}

const checkDomain = async (req, res) => {  
    const [domain, tld] = req.body.url.split('.')
    let priority = req.body.priority
    let priority_key = `priority_${priority-1}`

    try {
        if (tld_priority.hasOwnProperty(priority_key)) {
            let priority_file = tld_priority[priority_key]
            if (priority==1) priority_file.unshift(tld)
            var resJSON = await checkApi(domain, priority_file)
            res.status(200).json(resJSON)
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

module.exports = checkDomain
