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
                        if (_.has(resource.properties.actions.has("*")) &&  (((resource.properties.resources.has("*")))))
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
                        message: `AWS IAM ${resource.name} contains asterisk (*) in resources/actons`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}