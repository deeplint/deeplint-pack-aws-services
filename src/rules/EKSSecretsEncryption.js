exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = false;

            try {

                if (resource.type === 'aws::eks::types::encryptionconfig') {
                


                    if (_.has(resource.properties, 'resources') &&  ((   _.has(resource.properties.resources, "secrets")  )))
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
                        message: `AWS EKS ${resource.name} does not have the secrets encryption enabled`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}