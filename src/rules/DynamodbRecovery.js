exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = false;

            try {

                if (resource.type === 'aws::dynamodb::types::pointintimerecoverydescription') {
                


                    if (_.has(resource.properties, 'point_in_time_recovery_status') &&  (resource.properties.point_in_time_recovery_status == "ENABLED"))
                    {

                        isEnabled = true
                        continue 
                    }


                }


            }
            catch(e) {

                    console.error(e.message);
            }
        
            finally{

                if (!isEnabled) {
                    problems.push({
                        message: `AWS Dynamo DB ${resource.name} does not have the point_in_time_recovery (backup) enabled`
                    })
                }
                    continue
        
                }
        }

    }
    
    return problems
}