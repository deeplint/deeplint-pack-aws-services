exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = false;

            try {

                if (resource.type === 'aws::sagemaker::types::describenotebookinstanceoutput') {
                


                    if ((_.has(resource.properties, 'kms_key_id') &&  ((resource.properties.kms_key_id != "")) ))
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
                        message: `AWS Sage Maker ${resource.name} does not have the encryption enabled`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}