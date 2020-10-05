exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = false;

            try {

                if (resource.type === 'aws::kafka::types::encryptioninfo') {
                


                    if ((_.has(resource.properties, 'encryption_at_rest') &&  resource.properties.encryption_at_rest.data_volume_kms_key_id != ""))
                    {
                        if(resource.properties.encryption_in_transit.client_broker != 'TLS' || (_.has(resource.properties.encryption_in_transit, 'in_cluster') && resource.properties.encryption_in_transit ==false))
                        {
                        isEnabled = false;
                        continue;
                    }
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
                        message: `AWS MSK Cluster ${resource.name} does not have rest and/or transit encryption enabled`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}