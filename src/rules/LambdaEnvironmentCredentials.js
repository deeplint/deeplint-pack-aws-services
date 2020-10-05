exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')
    aws = [
        /(?<![A-Za-z0-9/+=])[A-Za-z0-9/+=]{40}(?![A-Za-z0-9/+=])/,  
        /A3T[A-Z0-9]|AKIA|AGPA|AIDA|AROA|AIPA|ANPA|ANVA|ASIA)[A-Z0-9]{16}/, 
        /(\"|')?(AWS|aws|Aws)?_?(SECRET|secret|Secret)?_?(ACCESS|access|Access)?_?(KEY|key|Key)(\"|')?\\s*(:|=>|=)\\s*(\"|')?[A-Za-z0-9/\\+=]{40}(\"|')?/,
        /(\"|')?(AWS|aws|Aws)?_?(ACCOUNT|account|Account)_?(ID|id|Id)?(\"|')?\\s*(:|=>|=)\\s*(\"|')?[0-9]{4}\\-?[0-9]{4}\\-?[0-9]{4}(\"|')?/
    ]

    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isExposed = false;

            try {

                if (resource.type === 'Aws::Lambda::Types::Environment') {
                
                    var arrayLength = aws.length;

                    if ((_.has(resource.properties, 'variables') ))
                    {
                        _.forOwn(resource.properties.variables, function(value, key) {
                            
                            for (var i = 0; i < arrayLength; i++) {
                                
                                if (aws[i].test(value))
                                {
                                    isExposed = true;
                                    break;
                                }
                            }
                        
                        })

                        
                    }
                    

                }


            }
            catch(e) {

                    console.error(e.message);
            }
        
            finally{

                if (isExposed) {
                    problems.push({
                        message: `AWS Lambda ${resource.name} has variable(s) which exposes confidential info/keys`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}