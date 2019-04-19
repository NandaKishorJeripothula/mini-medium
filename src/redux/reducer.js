//The Initial State 
const initialState = {
    //As no user logged in,its empty
    session: {}
    // session: { "Nane": "dfasd" },
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_SESSION':
            return {
                ...state, session: action.session
            }
        case 'RESET_STATE':
            return {
                ...initialState
            }
        default:
    }
    return state;
}