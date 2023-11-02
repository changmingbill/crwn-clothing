import { useState, useContext } from "react";
import {createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss'
import Button from "../button/button.component";
import {UserContext} from '../../contexts/user.context';
const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password} = formFields;

    // const {setCurrentUser} = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
    const siginInWithGoogle = async () => {
        await signInWithGooglePopup();
        // const { user } = await signInWithGooglePopup();
        // await createUserDocumentFromAuth(user);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
          const user = await signInAuthUserWithEmailAndPassword(email, password);  
        //   setCurrentUser(user);
          resetFormFields();

        } catch(error) {
            if (error.code === 'auth/wrong-password') {
                alert('incorrect password for email');
            }else if(error.code === 'auth/invalid-login-credentials'){
                alert('invalid-login-credentials');
            }else {
                console.log("🚀 ~ file: sign-in-form.component.jsx:32 ~ handleSubmit ~ error:", error);
            }
             

        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        // console.log("🚀 ~ file: sign-up-form.component.jsx:15 ~ handleChange ~ event.target:", event.target);

        setFormFields({...formFields, [name]: value});
    };

    return (
        <div className="sign-up-container">
         <h2>Already have an account?</h2>
         <span>Sign in with your email and password</span>
         <form onSubmit={handleSubmit}>
            <FormInput
                label="Email"
                type='email' required onChange={handleChange} name='email' value = {email}
            />
            <FormInput
                label="Password"
                type='text' required onChange={handleChange} name='password' value = {password}
            />
            <div className="buttons-container">
                <Button type="submit">Sign in</Button>
                <Button type="button" buttonType='google' onClick={siginInWithGoogle}>Google Sign in</Button>
            </div>
           
         </form>
        </div>
    )
}

export default SignInForm;