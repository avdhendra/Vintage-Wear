import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../firebase/firebase.utils";
import { Button } from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.style.scss";

const defaultFormField = {
  Username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUpForm() {
  const [formField, setFormField] = useState(defaultFormField);
  const { Username, email, password, confirmPassword } = formField;
  console.log(formField);

  const resetFormFields = () => {
    setFormField(defaultFormField);
  };
  
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };
  
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }
  
    try {
   const{user}=await createAuthUserWithEmailAndPassword(
        email,
        password
      );
  
    console.log('avc',user);
      await createUserDocumentFromAuth(user, { Username } );
      resetFormFields();
  
    }
     catch (error) {
    
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user,email already in use");
      }
       else {
        console.log("user creation encountered error: ", error.message);
      }
    }
  };
  
  
  return (
    <div className="sign-up-container">
      <h2>Don't have an account? </h2>
      <span> Sign up with Your email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          required
          label="Username"
          type="text"
          name="Username"
          onChange={handleChange}
          value={Username}
        />

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

        <FormInput
          label="ConfirmPassword"
          required
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default SignUpForm;
