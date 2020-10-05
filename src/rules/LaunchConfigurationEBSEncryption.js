exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = false;

            try {

                if (resource.type === 'aws::ec2::types::blockdevicemapping') {
                


                    if ((_.has(resource.properties, 'ebs') &&  ((resource.properties.ebs.encrypted == true))))
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
                        message: `AWS EBS ${resource.name} does not have encryption enabled`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}