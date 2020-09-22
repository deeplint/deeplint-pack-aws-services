exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isV1Disabled = false;

            try {

                if (resource.type === 'aws::ec2::types::instancemetadataoptionsrequest') {
                


                    if ((_.has(resource.properties, 'http_endpoint') &&  (((resource.properties.http_endpoint == "disable")))) || (_.has(resource.properties, 'http_tokens') &&  (((resource.properties.http_tokens == "required")))))
                    {
                    
                        
                        isV1Disabled = true;
                        continue;
                        
                    }
                    

                }


            }
            catch(e) {

                    console.error(e.message);
            }
        
            finally{

                if (!isV1Disabled) {
                    problems.push({
                        message: `AWS EC2 instance/Launch template ${resource.name} has Metadata Service Version 1 enabled `
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}