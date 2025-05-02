import {createContext, Dispatch, SetStateAction, useEffect, useReducer} from 'react'
import { AppUser } from '../interface/AppUser.type';
import { onAuthStateChangedListener, createUserDoc } from '../../utils/firebase/firebase.utils';
import { createAction } from '../../utils/reducer/reducer.utils';

type UserContextType = {
    currentUser: AppUser | null,
    setCurrentUser: Dispatch<SetStateAction<AppUser | null>> 
}

export const UserContext = createContext<UserContextType>({
    currentUser: null,
    setCurrentUser: () => null
})

export const USER_REDUCER_INITIAL_STATE = {
    currentUser: null
}

type actionProps = {
    type: string,
    payload: AppUser | null
}

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

export const userReducer = (state: {currentUser:AppUser | null} = USER_REDUCER_INITIAL_STATE, action: actionProps) => {
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

const UserProvider = ({ children }: React.PropsWithChildren) => {
    const [{ currentUser }, dispatch ] = useReducer(userReducer, USER_REDUCER_INITIAL_STATE);

    const setCurrentUser = (user: AppUser | null) => {
        dispatch(createAction('SET_CURRENT_USER', user));
    }

    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(async (user) => {
            if (user) {
                const updatedUser = await createUserDoc(user)
                setCurrentUser(updatedUser);
            }
        });
        return unsubscribe;
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

export default UserProvider;