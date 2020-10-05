exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')
    account_access = /\d{12}|arn:aws:iam::\d{12}:root/

    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isGrantedSpecific = false;

            try {

                if (resource.type === 'aws::core::policy::statement') {
                


                    if (_.has(resource.properties, 'principals') &&  ((((resource.properties.principals.AWS).match(account_access) == null ))))
                    {

                        isGrantedSpecific = false;
                        continue;
                        
                    }
                    

                }


            }
            catch(e) {
                    //means only to specific users, not to root
                    isGrantedSpecific = true;
                    console.error(e.message);
            }
        
            finally{

                if (!isGrantedSpecific) {
                    problems.push({
                        message: `AWS IAM ${resource.name} has generic principals to assume the role`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}