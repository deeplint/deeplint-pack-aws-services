exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = false;

            try {

                if (resource.type === 'aws::cloudwatchlogs::types::loggroup') {
                


                    if ((_.has(resource.properties, 'retention_in_days') &&  ((resource.properties.retention_in_days != null)) ))
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
                        message: `AWS Cloud Watch Logs ${resource.name} does not have any retention days set`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}