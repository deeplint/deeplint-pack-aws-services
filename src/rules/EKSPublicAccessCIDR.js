exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let is0 = true;

            try {

                if (resource.type === 'aws::eks::types::vpcconfigrequest') {
                


                    if (_.has(resource.properties, 'endpoint_public_access') &&  ((resource.properties.endpoint_public_access == false)))
                    {

                        is0 = false;
                        continue;

                    }
                    
                    else if (_.has(resource.properties, 'endpoint_public_access') &&  ((resource.properties.endpoint_public_access == true)))
                    {
                        if (_.has(resource.properties.endpoint_public_access, 'public_access_cidrs') &&  ((resource.properties.endpoint_public_access.public_access_cidrs).has("0.0.0.0/0")))
                        {
                        
                            is0 = true;
                        }

                    }

                }


            }
            catch(e) {

                    console.error(e.message);
            }
        
            finally{

                if (is0) {
                    problems.push({
                        message: `AWS EKS ${resource.name} has 0.0.0.0/0 for accepting public iIngress traffic`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}