exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = false;

            try {

                if (resource.type === 'aws::lambda::types::tracingConfig') {
                


                    if ((_.has(resource.properties, 'mode') &&  (((resource.properties.mode == "Active") || (resource.properties.mode == "PassThrough")))))
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
                        message: `AWS Lambda ${resource.name} does not have X-Ray enabled`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}