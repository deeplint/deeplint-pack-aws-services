exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = false;

            try {

                if (resource.type === 'aws::kafka::types::logginginfo') 
                {
                


                    if (resource.propertie.broker_log.enabled == 'true' && resource.propertie.firehose.enabled == 'true' && resource.propertie.s3.enabled == 'true' )
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
                        message: `AWS MSK Cluster ${resource.name} does not have some of the logging functions enabled`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}