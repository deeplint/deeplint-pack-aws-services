exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = false;

            try {

                if (resource.type === 'aws::codebuild::types::buildartifacts') {
                


                    if (_.has(resource.properties, 'encryption_disabled') && resource.properties.encryption_disabled == false)
                    {

                        isEnabled = true
                        continue 
                    }


                }
            


            }
            catch(e) {

                    console.error(e.message);
            }
        
            finally{

                if (!isEnabled) {
                    problems.push({
                        message: `AWS Code Build ${resource.name} does not have the encryption enabled`
                    })
                }
                    continue
        
                }
        }

    }
    
    return problems
}