exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = false;

            try {

                if (resource.type === 'aws::eks::types::encryptionconfig') {
                


                    if (_.has(resource.properties, 'resources') &&  (((resource.properties.resources).has("secrets"))))
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
                        message: `AWS EKS ${resource.name} has 0.0.0.0/0 for accepting public iIngress traffic`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}