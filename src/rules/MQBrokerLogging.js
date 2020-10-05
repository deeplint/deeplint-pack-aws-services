exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = false;

            try {

                if (resource.type === 'aws::mq::types::logs') {
                


                    if ((_.has(resource.properties, 'general') &&  ((resource.properties.general == true))))
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
                        message: `AWS MQ ${resource.name} does not have general logging enabled`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}