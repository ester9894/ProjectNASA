function convertActionTypeToName(actionType) {
    return actionType.toLowerCase().replace(/_(\w)/g, v => v[1].toUpperCase());
}

export function createReducer(state,action,hendlers){
const key=convertActionTypeToName(action.type);
const handler=hendlers[key];
if(handler){
    handler(state,action);
}
}