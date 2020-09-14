exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')


    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isMulti = false;

            try {

                if (resource.type === 'aws::cloudtrail::types::trail') {
                


                    if (_.has(resource.properties, 'is_multi_region_trail') && resource.properties.is_multi_region_trail == true)
                    {

                        isMulti = true
                        continue 
                    }


                }
            


            }
            catch(e) {

                    console.error(e.message);
            }
        
            finally{

                if (!isMulti) {
                    problems.push({
                        message: `AWS CloudTrail ${resource.name} is not enabled in all regions`
                    })
                }
                    continue
        
                }
        }

    }
    
    return problems
}