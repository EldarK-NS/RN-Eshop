import { AUTHENTICATE, LOGOUT } from '../types'

const initialState = {
    token: null,
    userId: null
}

export default authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:

            return {
                token: action.token,
                userId: action.userId
            }
        case LOGOUT:
            return initialState;
        // case SIGN_UP:
        //     return {
        //         token: action.token,
        //         userId: action.userId
        //     }

        default:
            return state
    }

}