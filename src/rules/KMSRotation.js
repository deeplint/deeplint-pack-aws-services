exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = false;

            try {

                if (resource.type === 'aws::kms::types::getkeyrotationstatusresponse') {
                


                    if ((_.has(resource.properties, 'key_rotation_enabled') &&  (((resource.properties.key_rotation_enabled == true)))))
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
                        message: `AWS KMS ${resource.name} does not have key rotation enabled`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}