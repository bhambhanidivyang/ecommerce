import React, { useState } from 'react';
import { SignUpFormInput } from './generic/SignUpFormInput';
import { createUserDoc, userSignInWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import { AppUser } from '../interface/AppUser.type';
import { ThemeButton } from './generic/ThemeButton';

const defaultFields = {
    signInEmail: '',
    signInPassword: ''
}

const defaultValidations = {
    signInEmail: '',
    signInPassword: '',
    firebaseError: ''
}

type SignInProps = {
    logGoogleUser: () => Promise<void>,
    updateUserState: (userDoc: AppUser) => void;
    setLoadingState: () => void
    unsetLoadingState: () => void
}

export const SignIn = ({ logGoogleUser, updateUserState, setLoadingState, unsetLoadingState }: SignInProps) => {
    const [formFields, setFormFields] = useState(defaultFields);
    const [validationError, setValidationError] = useState(defaultValidations);

    const {signInEmail, signInPassword} = formFields;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event?.target;
        setFormFields({...formFields, [name]: value});
        setValidationError({...validationError, [name]: ''});
    }

    const handleSignIn = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        setLoadingState();
        if (!signInEmail) {
            setValidationError({...validationError, ['signInEmail']: 'Email is a required field'});
            return;
        }
        if (!signInPassword) {
            setValidationError({...validationError, ['signInPassword']: 'Password is a required field'});
            return;
        }
        try {
            const response = await userSignInWithEmailAndPassword(signInEmail, signInPassword);
            console.log(response);
            const user = response.user;
            const userData = await createUserDoc(user);
            if (userData) updateUserState(userData);
            unsetLoadingState();
        } catch (e) {
            setValidationError({...validationError, ['firebaseError']: 'Invalid Credentials'});
        }
    }
    return (
        <>
            <div className='w-full max-w-lg text-left'>
                <h1 className='text-center text-lg'>Already registered?</h1>
                <h1 className='font-bold text-3xl font-sans mb-2 text-center'>Sign In</h1>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-200" onSubmit={handleSignIn}>
                    <SignUpFormInput 
                        label="Email"
                        onChange={handleChange}
                        value={signInEmail}
                        className="shadow appearance-none border border-purple-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="signInEmail"
                        name="signInEmail"
                        type="text"
                        placeholder="Email"
                        autoComplete='off'
                        validationError={validationError.signInEmail}
                    />
                    <SignUpFormInput 
                        label="Password"
                        onChange={handleChange}
                        value={signInPassword}
                        className="shadow appearance-none border border-purple-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="signInPassword"
                        name="signInPassword"
                        type="password"
                        placeholder="Password"
                        autoComplete='off'
                        validationError={validationError.signInPassword}
                    />
                    <div className='p-2'>
                        <div className='text-center'>
                            <ThemeButton btntype="primary" type="submit">Sign In</ThemeButton>
                            <ThemeButton btntype="outlined" type="button" cb={logGoogleUser}>Sign In With Google</ThemeButton>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}