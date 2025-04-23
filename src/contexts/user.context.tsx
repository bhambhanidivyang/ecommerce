import {createContext, useState, Dispatch, SetStateAction, useEffect} from 'react'
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

const UserProvider = ({ children }: React.PropsWithChildren) => {
    const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) createUserDoc(user)
            setCurrentUser(user);
        });
        return unsubscribe;
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

export default UserProvider;