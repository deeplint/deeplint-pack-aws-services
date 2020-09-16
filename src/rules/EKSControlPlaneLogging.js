exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = false;

            try {

                if (resource.type === 'aws::eks::types::logging') {
                


                    if (_.has(resource.properties, 'cluster_logging') &&  ((resource.properties.cluster_logging).has("enabled: true")))
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
                        message: `AWS EKS ${resource.name} does not have logging enabled`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}