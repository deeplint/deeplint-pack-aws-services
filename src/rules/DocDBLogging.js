exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')
    let log_types = ["profiler", "audit"]

    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = false;

            try {

                if (resource.type === 'aws::docdb::types::dbinstance') {
                


                    if (_.has(resource.properties, 'enabled_cloudwatch_logs_exports') &&  (resource.properties.enabled_cloudwatch_logs_exports).some(v => log_types.includes(v)))
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
                        message: `AWS Doc DB ${resource.name} does not have the proper logging enabled`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}