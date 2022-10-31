import React from 'react'
//import { signInWithGooglePopup ,createUserDocumentFromAuth} from '../../firebase/firebase.utils'
import SignInForm from './sign-in-form.component'
import SignUpForm from './sign-up-form'
import './authentication.component.scss'


function Authentication() {
    
  return (
    <div className="authentication-container">
        {/* <button onClick={logGoogleUser}>SignIn With GOOGLE</button> */}
        <SignInForm/>
        <SignUpForm/>
        
    </div>
  )
}

export default Authentication