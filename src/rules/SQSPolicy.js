exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')
   

    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = true;

            try {

                if (resource.type === 'aws::sqs::types::hetqueueattributesresult') {
                


                    if (  (_.has(resource.properties, 'attributes') && (resource.properties.attributes.policy.statement.action == "*" )))
                    {
                    


                        isEnabled = false;
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
                        message: `AWS SQS Queue ${resource.name} contains asterisk (*) for policy actions`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}