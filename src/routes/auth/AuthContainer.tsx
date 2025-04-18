import { SignUp } from '../../components/SignUp';
import { SignIn } from '../../components/SignIn';
import { useState } from 'react';
import { signInWithGooglePopup, createUserDoc } from '../../../utils/firebase/firebase.utils';
import { AppUser } from '../../interface/AppUser.type';

export const AuthContainer = () => {
    const [user, setUser] = useState({displayName: "", email:"", isLoggedIn: false});
    const [loading, setLoading] = useState(false);
    const logGoogleUser = async () => {
        setLoading(true);
        const response = await signInWithGooglePopup();
        const userDoc = await createUserDoc(response.user);
        setUser({
            displayName: userDoc?.displayName,
            email: userDoc?.email,
            isLoggedIn: true
        });
        setLoading(false);
    }
    const updateUserState = (userDoc: AppUser) => {
        setUser({
            displayName: userDoc?.displayName ?? '',
            email: userDoc?.email ?? '',
            isLoggedIn: true
        })
    }

    const setLoadingState = () => {
        setLoading(true);
    }

    const unsetLoadingState = () => {
        setLoading(false);
    }

    return (
        <>
            {loading && <div className='text-center font-sans flex items-center justify-center p-4 bg-gray-100'>Loading...</div>}
            {user.isLoggedIn === false && 
                <div className="flex items-center justify-center p-4 bg-gray-100">
                    <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
                        <SignIn logGoogleUser={logGoogleUser} updateUserState={updateUserState} setLoadingState={setLoadingState} unsetLoadingState={unsetLoadingState} />
                        <SignUp updateUserState={updateUserState} />
                    </div>
                </div>
            }
            {user.isLoggedIn === true && <div className='text-center font-sans flex items-center justify-center p-4 bg-gray-100'>
                    Hello<span className='text-purple-500 font-bold'> {user.displayName}</span>. Welcome to the Dashboard.
                </div>
            }
        </>
    )
}