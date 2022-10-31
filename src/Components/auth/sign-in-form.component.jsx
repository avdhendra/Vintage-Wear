import React from "react";
import { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../firebase/firebase.utils";
import "./sign-in-form.style.scss";
import { Button } from "../button/button.component";
import FormInput from "../form-input/form-input.component";
//import { UserContext } from "../context/user.context";

const defaultFormField = {
  email: "",
  password: "",
};

function SignInForm() {
  const [formField, setFormField] = useState(defaultFormField);
  const { email, password } = formField;

//const {setCurrentUser} = useContext(UserContext)

 
  // const resetFormFields = () => {
  //   setFormField(defaultFormField);
  // };

  //Google authentication
  const signInWithGoogle = async () => {
 await signInWithGooglePopup();
      //const{user}
     // console.log(response)
    //setCurrentUser(user);
   // await createUserDocumentFromAuth(user);
  };

  //console.log(formField);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
       await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
  //  setCurrentUser(user)
   //   console.log(user);
      // resetFormFields();
    } catch (error) {
     switch(error.code){
      case 'auth/wrong-password':
        alert('incorrect password for email')
        break
      case 'auth/user-not-found':
        alert('no user associated with this email')
        break
      default: 
      console.log(error)
     }
      
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an Account? </h2>
      <span> Sign In with Your email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          required
          type="email"
          label="Email"
          name="email"
          onChange={handleChange}
          value={email}
        />

        <FormInput
          label="Password"
          required
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type='button'buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
export default SignInForm;
