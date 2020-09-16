exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = false;

            try {

                if (resource.type === 'aws::cloudtrail::types::trail') {
                


                    if (_.has(resource.properties, 'log_file_validation_enabled') && resource.properties.log_file_validation_enabled == true)
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
                        message: `AWS CloudTrail ${resource.name} does not have the log file validation enabled`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}