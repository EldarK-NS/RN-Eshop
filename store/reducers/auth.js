import { SIGN_UP, LOGIN } from '../types'

const initialState = {
    token: null,
    userId: null
}

export default authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:

            return {
                token: action.token,
                userId: action.userId
            }
        case SIGN_UP:
            return {
                token: action.token,
                userId: action.userId
            }

        default:
            return state
    }

}