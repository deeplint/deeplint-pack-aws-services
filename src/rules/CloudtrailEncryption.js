exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEncrypted = false;

            try {

                if (resource.type === 'aws::cloudtrail::types::trail') {
                


                    if (_.has(resource.properties, 'kms_key_id') && resource.properties.kms_key_id != "")
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
                        message: `AWS CloudTrail ${resource.name} does not have the encryption enabled`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}