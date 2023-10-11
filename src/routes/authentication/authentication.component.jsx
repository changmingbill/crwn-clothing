import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss';
const Authentication = () => {
 /*  useEffect(async () => {
    const response = await getRedirectResult(auth);
    if(response) {
      await createUserDocumentFromAuth(response);
    }
  },[]); */



  // const logGoogleRedirectUser = async () => {
  //   const { user } = await signInWithGoogleRedirect();
  // };


  return (
    <div className='authentication-container'>
      {/* <button onClick={logGoogleUser}>Sign in with Google Popup</button> */}
      <SignInForm/>
      <SignUpForm/>
    </div>
  );
};

export default Authentication;
