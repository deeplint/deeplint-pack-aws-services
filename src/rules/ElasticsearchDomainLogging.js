exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = false;

            try {

                if (resource.type === 'aws::elasticsearchservice::types::logpublishingoption') {
                


                    if (_.has(resource.properties, 'enabled') &&  (((resource.properties.enabled == true))))
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
                        message: `AWS ElastiCache ${resource.name} does not have the logging enabled`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}