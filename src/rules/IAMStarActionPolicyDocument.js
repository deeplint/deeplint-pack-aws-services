exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = false;

            try {

                if (resource.type === 'aws::core::policy::statement') {
                


                    if (_.has(resource.properties, 'effect') &&  (((resource.properties.effect == "Allow"))))
                    {
                        if (( _.has(resource.properties.actions , "*")))
                        {
                        isEnabled = true;
                        continue;
                        }
                    }
                    

                }


            }
            catch(e) {

                    console.error(e.message);
            }
        
            finally{

                if (!isEnabled) {
                    problems.push({
                        message: `AWS IAM Policy ${resource.name} contains asterisk (*) in actions`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}