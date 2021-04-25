
function convertActionNameToType(actionName) {
    return actionName.replace(/([A-Z])/g, "_$1").toUpperCase();
}
export  const actions = new Proxy(
    {},
    {
        get: function (target, prop) {
 
            return function (args) {
                if (target[prop] === undefined) {
                    target[prop] =  convertActionNameToType(prop);
                    return {
                        type:  target[prop],
                        payload: args
                    }
                }
                else return {type:target[prop],payload:args};
            }

        }
    }
)


