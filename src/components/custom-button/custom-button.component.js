import React from "react";
import "./custom-button.styles.scss";

import { CustomButtonContainer } from "./custom-button.styles";

// const CustomButton = ({ children, isGoogleSignIn, inverted, ...others }) => {
//   return (
//     <button
//       className={`${inverted ? "inverted" : ""} ${
//         isGoogleSignIn ? "google-sign-in" : ""
//       } custom-button`}
//       {...others}
//     >
//       {children}
//     </button>
//   );
// };

const CustomButton = ({ children, ...others }) => {
  return <CustomButtonContainer {...others}>{children}</CustomButtonContainer>;
};

export default CustomButton;
