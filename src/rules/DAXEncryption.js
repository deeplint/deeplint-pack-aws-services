exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = false;

            try {

                if (resource.type === 'aws::dax::types::ssedescription') {
                


                    if (_.has(resource.properties, 'status') && resource.properties.status == "ENABLED")
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
                        message: `AWS DAX ${resource.name} does not have the Server Side encryption enabled`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}