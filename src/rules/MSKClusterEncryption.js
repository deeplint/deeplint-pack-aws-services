exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = false;

            try {

                if (resource.type === 'aws::kafka::types::encryptioninfo') {
                


                    if ((_.has(resource.properties, 'encryption_at_rest') &&  ((_.has(resource.properties.encryption_at_rest, "data_volume_kms_key_id")) && (_.has(resource.properties, 'encryption_in_transit') && ( ))))
                    {
                    
                        //TODO: Complete the statements
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
                        message: `AWS EBS ${resource.name} does not have encryption enabled`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}