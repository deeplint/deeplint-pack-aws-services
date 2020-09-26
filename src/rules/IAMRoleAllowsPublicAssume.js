exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isPublic = false;

            try {

                if (resource.type === 'aws::core::policy::statement') {
                


                    if (_.has(resource.properties, 'effect') &&  (((resource.properties.effect == "Allow"))))
                    {
                        if (_.has(resource.properties.principal, 'AWS') &&  ((  _.has((resource.properties.principal.AWS), "*" ))))
                        {
                        isPublic = true;
                        continue;
                        }
                    }
                    

                }


            }
            catch(e) {

                    console.error(e.message);
            }
        
            finally{

                if (isPublic) {
                    problems.push({
                        message: `AWS IAM Role ${resource.name} contains asterisk (*) in resources/actons to assume itself`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}