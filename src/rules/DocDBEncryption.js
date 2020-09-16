exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = false;

            try {

                if (resource.type === 'aws::docdb::types::dbclustersnapshot') {
                


                    if (_.has(resource.properties, 'storage_encrypted') && resource.properties.storage_encrypted == true)
                    {

                        isEnabled = true;
                        continue; 
                    }


                }
            
                else if (resource.type === 'aws::docdb::types::dbInstance') {
                


                    if (_.has(resource.properties, 'storage_encrypted') && resource.properties.storage_encrypted == true)
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
                        message: `AWS Doc DB ${resource.name} does not have the encryption enabled`
                    })
                }
                    continue
        
                }
        }

    }
    
    return problems
}