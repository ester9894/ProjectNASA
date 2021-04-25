import { produce } from "immer"
import { createReducer } from "./reducerUtils"
const initialState = {
    user: {
        name: "",       
    }
}
const handlers = {
    setUserName(state, action) { state.user.name = action.payload }
}

export default produce((state, action) => createReducer(state, action, handlers), initialState)