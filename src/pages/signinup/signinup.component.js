import React from "react";

import "./signinup.styles.scss";
import Signin from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

const SignInUp = () => {
  console.log("--------signinpage");
  return (
    <div className="sign-in-up">
      <Signin />
      <SignUp />
    </div>
  );
};

export default SignInUp;
