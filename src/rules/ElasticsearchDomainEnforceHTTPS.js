exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = false;

            try {

                if (resource.type === 'aws::elasticsearchservice::types::domainendpointoptions') {
                


                    if (_.has(resource.properties, 'enforce_https') &&  (((resource.properties.enforce_https == true))))
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
                        message: `AWS ElastiCache ${resource.name} has the in-transit encryption enabled but no AuthToken set`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}