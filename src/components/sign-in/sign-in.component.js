import React, { useState } from "react";
import { connect } from "react-redux";

import "./sign-in.styles.scss";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
// import { signInWithGoogle, auth } from "../../firebase/firebase.utils";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.action";

const SignIn = (props) => {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const { email, password } = userData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.signInWithEmail(email, password);
  };

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={email}
          required
          handleChange={handleChangeInput}
          label="Email"
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          required
          handleChange={handleChangeInput}
          label="Password"
        />

        <div className="button">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton
            onClick={props.signInWithGoogle}
            isGoogleSignIn
            type="button"
          >
            Sign In With Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (dispatch) => ({
  signInWithGoogle: () => dispatch(googleSignInStart()),
  signInWithEmail: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapStateToProps)(SignIn);
