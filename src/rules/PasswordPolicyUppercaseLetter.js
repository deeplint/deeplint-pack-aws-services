exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = false;

            try {

                if (resource.type === 'aws::iam::types::passwordpolicy') {
                


                    if ((_.has(resource.properties, 'require_uppercase_characters') &&  ((resource.properties.require_uppercase_characters == true))))
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
                        message: `AWS IAM Passport policy ${resource.name} does not oblige the usage of at least uppercase character`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}