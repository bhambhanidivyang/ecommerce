import { AppUser } from "../../interface/AppUser.type"

const INITIAL_STATE = {
    currentUser: null
}

type actionProps = {
    type: string,
    payload: AppUser | null
}

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

export const userReducer = (state: {currentUser:AppUser | null} = INITIAL_STATE, action: actionProps) => {
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