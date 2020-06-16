import React, { useState } from "react";
import { connect } from "react-redux";
import "./sign-up.styles.scss";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import { signUpStart } from "../../redux/user/user.action";

const SignUp = (props) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });

  const { displayName, email, password, confirmPassword } = userData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("password don't match");
      return;
    }

    props.signUpStart(email, password, displayName);
  };

  const handleChangeInput = (e) => {
    const { value, name } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="sign-up">
      <h2>I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="displayName"
          type="text"
          value={displayName}
          required
          handleChange={handleChangeInput}
          label="Display Name"
        />
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

        <FormInput
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          required
          handleChange={handleChangeInput}
          label="Confirm Password"
        />

        <div className="button">
          <CustomButton type="submit">Sign Up</CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUpStart: (email, password, displayName) =>
    dispatch(signUpStart({ email, password, displayName })),
});

export default connect(null, mapDispatchToProps)(SignUp);
