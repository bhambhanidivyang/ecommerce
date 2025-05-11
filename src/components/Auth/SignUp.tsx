import { useState } from 'react';
import {createUserFromEmailAndPassword, createUserDoc} from '../../../utils/firebase/firebase.utils'
import { SignUpFormInput } from '../generic/SignUpFormInput';
import { ThemeButton } from '../generic/ThemeButton';
import { updateProfile } from 'firebase/auth';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confpassword: '',
} 

const defaultValidations = {
    displayName: '',
    email: '',
    password: '',
    confpassword: '',
}

type SignUpProps = {
    setLoadingState: () => void,
    unsetLoadingState: () => void
}

export const SignUp = ({ setLoadingState, unsetLoadingState }: SignUpProps) => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [validationError, setValidationError] = useState(defaultValidations);
    const {displayName, email, password, confpassword} = formFields;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event?.target;
        setFormFields({...formFields, [name]: value});
        setValidationError({...validationError, [name]: ''});
    }

    const handleSubmit = async (e:React.SyntheticEvent) => {
        e.preventDefault();
        setLoadingState();
        if (!displayName) {
            setValidationError({...validationError, ['displayName']: 'Display Name is a required field'});
            unsetLoadingState();
            return;
        }
        if (!email) {
            setValidationError({...validationError, ['email']: 'Email is a required field'});
            unsetLoadingState();
            return;
        }
        if (!password) {
            setValidationError({...validationError, ['password']: 'Password is a required field'});
            unsetLoadingState();
            return;
        }
        if (!confpassword) {
            setValidationError({...validationError, ['confpassword']: 'Confirm Password is a required field'});
            unsetLoadingState();
            return;
        }

        if (password !== confpassword) {
            setValidationError({...validationError, ['confpassword']: 'Confirm Password should match Password'});
            unsetLoadingState();
            return;
        }
        console.log('all validations passed');
        
        try {
            const { user } = await createUserFromEmailAndPassword(email, password);
            await updateProfile(user, { displayName });
            await createUserDoc(user, {displayName});
        } catch (error) {
            console.log(error,'error');
        } finally {
            unsetLoadingState();
        }
    }
    return (
        <>            
            <div className="w-full max-w-lg text-left">
            <h1 className='text-center text-lg'>Don't have an account?</h1>
            <h1 className='font-bold text-3xl font-sans mb-2 text-center'>Create a New Account</h1>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-200">
                    <SignUpFormInput 
                        label="Display Name"
                        onChange={handleChange}
                        value={displayName}
                        id="displayName"
                        name="displayName"
                        type="text"
                        placeholder="Display Name"
                        autoComplete='off'
                        validationError={validationError.displayName}
                    />
                    <SignUpFormInput 
                        label="Email"
                        onChange={handleChange}
                        value={email}
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Email"
                        autoComplete='off'
                        validationError={validationError.email}
                    />
                    <SignUpFormInput 
                        label="Password"
                        onChange={handleChange}
                        value={password}
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete='off'
                        validationError={validationError.password}
                    />
                    <SignUpFormInput 
                        label="Confirm Password"
                        onChange={handleChange}
                        value={confpassword}
                        id="confpassword"
                        name="confpassword"
                        type="password"
                        placeholder="Confirm Password"
                        autoComplete='off'
                        validationError={validationError.confpassword}
                    />
                    <div className="flex items-center justify-between mt-5">
                        <ThemeButton btntype='primary' type="submit">Sign Up</ThemeButton>
                        <a className="inline-block align-baseline font-bold text-sm text-purple-500 hover:text-purple-800" href="#">
                            Forgot Password?
                        </a>
                    </div>
                </form>
            </div>        
        </>
    );
};