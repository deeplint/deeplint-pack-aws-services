exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = true;

            try {

                if (resource.type === 'aws::elasticache::types::createreplicationgroupmessage') {
                


                    if (_.has(resource.properties, 'transit_encryption_enabled') &&  (((resource.properties.transit_encryption_enabled == true))))
                    {
                        if  (!_.has(resource.properties, 'auth_token'))

                        {
                                isEnabled = false;
                                continue;

                    }}
                    

                }


            }
            catch(e) {

                    console.error(e.message);
            }
        
            finally{

                if (!isEnabled) {
                    problems.push({
                        message: `AWS ElastiCache ${resource.name} has the in-transit encryption enabled but no AuthToken set`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}