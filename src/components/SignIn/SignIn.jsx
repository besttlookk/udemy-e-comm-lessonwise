import React, { useState } from "react";
import { auth, signInWithGoogle } from "../../firebase/firebase.config";
import CustomButton from "../CustomButton/CustomButton";
import FormInput from "../FormInput/FormInput";
import "./SignIn.scss";

const SignIn = () => {
  const [formInfo, setFormInfo] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formInfo;

  const handleChange = (event) => {
    const { value, name } = event.target;
    setFormInfo({ ...formInfo, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // no need to get the response of user here as firebase provide default observer fot user: onAuthStateChange
      await auth.signInWithEmailAndPassword(email, password);
      setFormInfo({ email: "", password: "" });
    } catch (error) {
      console.error("Error during signin", error.message);
    }
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          handleChange={handleChange}
          value={email}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="password"
          required
        />
        <div className="buttons">
          <CustomButton type="submit"> Sign in </CustomButton>
          <CustomButton type="button" isGoogleSignIn onClick={signInWithGoogle}>
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
