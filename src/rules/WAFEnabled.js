exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = false;

            try {

                if (resource.type === 'aws::waf::types::webacl') {
                


                    if ((_.has(resource.properties, 'web_acl_id') &&  ((resource.properties.web_acl_id != "")) ))
                    {
                    

                        isEnabled = true;
                        continue;
                        
                    }
                    

                }


            }
            catch(e) {

                    console.error(e.message);
            }
        
            finally{

                if (!isEnabled) {
                    problems.push({
                        message: `AWS CloudFront ${resource.name} does not have any WAF enabled`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}