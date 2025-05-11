import { AppUser } from "../../interface/AppUser.type"

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

export const USER_REDUCER_INITIAL_STATE: userStateType = {
    currentUser: null
}

export type userStateType = {
    currentUser:AppUser | null
}

export type actionProps = {
    type: string,
    payload: AppUser | null
}