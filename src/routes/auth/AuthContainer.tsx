import { SignUp } from '../../components/SignUp';
import { SignIn } from '../../components/SignIn';
import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';

export const AuthContainer = () => {
    const [loading, setLoading] = useState(false);
    const {currentUser} = useContext(UserContext);

    const setLoadingState = () => {
        setLoading(true);
    }

    const unsetLoadingState = () => {
        setLoading(false);
    }

    return (
        <>
            {loading && <div className='text-center font-sans flex items-center justify-center p-4 bg-gray-100'>Loading...</div>}
            {!currentUser && 
                <div className="flex items-center justify-center p-4 bg-gray-100">
                    <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
                        <SignIn setLoadingState={setLoadingState} unsetLoadingState={unsetLoadingState} />
                        <SignUp setLoadingState={setLoadingState} unsetLoadingState={unsetLoadingState} />
                    </div>
                </div>
            }
            {currentUser && <div className='text-center font-sans flex items-center justify-center p-4 bg-gray-100'>
                    Hello <span className='ml-1 font-bold'>{currentUser.displayName}</span>. Welcome to the Dashboard.
                </div>
            }
        </>
    )
}