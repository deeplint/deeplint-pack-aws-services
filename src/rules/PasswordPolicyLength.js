exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = false;

            try {

                if (resource.type === 'aws::iam::types::passwordpolicy') {
                


                    if ((_.has(resource.properties, 'minimum_password_length') &&  ((resource.properties.minimum_password_length >= 14))))
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
                        message: `AWS IAM Passport policy ${resource.name} has min passport length set to something lower than 14`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}