import {actionProps, USER_ACTION_TYPES, USER_REDUCER_INITIAL_STATE, userStateType} from './user.types'

export const userReducer = (state: userStateType = USER_REDUCER_INITIAL_STATE, action: actionProps) => {
    const { type, payload } = action;
    
    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            return state;
    }
}