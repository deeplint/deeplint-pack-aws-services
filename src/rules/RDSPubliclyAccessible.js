exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = false;

            try {

                if (resource.type === 'aws::rds::types::dbinstance') {
                


                    if ((_.has(resource.properties, 'publicly_accessible') &&  ((resource.properties.publicly_accessible == false))))
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
                        message: `AWS RDS Instance policy ${resource.name} does not have the encryption enabled`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}