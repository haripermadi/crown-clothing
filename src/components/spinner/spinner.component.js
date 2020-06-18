import React from "react";

import { SpinnerContainer, SpinnerOverlay } from "./spinner.styles";

const Spinner = ({ isLoading, ...other }) => {
  return (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  );
};

export default Spinner;
