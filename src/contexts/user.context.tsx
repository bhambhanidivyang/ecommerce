import {createContext, Dispatch, SetStateAction, useEffect, useReducer} from 'react'
import { AppUser } from '../interface/AppUser.type';
import { onAuthStateChangedListener, createUserDoc } from '../../utils/firebase/firebase.utils';

type UserContextType = {
    currentUser: AppUser | null,
    setCurrentUser: Dispatch<SetStateAction<AppUser | null>> 
}

export const UserContext = createContext<UserContextType>({
    currentUser: null,
    setCurrentUser: () => null
})

type actionProps = {
    type: string,
    payload: AppUser | null
}

const userReducer = (state: {currentUser:AppUser | null}, action: actionProps) => {
    const { type, payload } = action;
    
    switch (type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error('Error in ' + type);
    }
}

const UserProvider = ({ children }: React.PropsWithChildren) => {
    const [{ currentUser }, dispatch ] = useReducer(userReducer, {currentUser: null});

    const setCurrentUser = (user: AppUser | null) => {
        dispatch({ type:'SET_CURRENT_USER', payload:user });
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