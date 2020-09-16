exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isDisabled = false;

            try {

                if (resource.type === 'aws::eks::types::vpcconfigrequest') {
                


                    if (_.has(resource.properties, 'endpoint_public_access') &&  ((resource.properties.endpoint_public_access == false)))
                    {

                        isDisabled = true;
                        continue; 
                    }


                }


            }
            catch(e) {

                    console.error(e.message);
            }
        
            finally{

                if (!isDisabled) {
                    problems.push({
                        message: `AWS EKS ${resource.name} has public access enabled`
                    })
                }
                    continue
        
                }
        }

    }
    
    return problems
}