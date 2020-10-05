exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEncrypted = false;

            try {

                if (resource.type === 'aws::kinesis::types::streamdescription') {
                


                    if ((_.has(resource.properties, 'encryption_type') &&  (((resource.properties.encryption_type == "KMS")))))
                    {
                    
                        
                        isEncrypted = true;
                        continue;
                        
                    }
                    

                }


            }
            catch(e) {

                    console.error(e.message);
            }
        
            finally{

                if (!isEncrypted) {
                    problems.push({
                        message: `AWS Kinesis Stream ${resource.name} does not have the KMS encryption enabled`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}