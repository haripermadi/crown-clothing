import React from "react";

import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

// HOC take component return component
const WithSpinner = (WrappedComponent) => {
  const Spinner = ({ isLoading, ...other }) => {
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent {...other} />
    );
  };
  return Spinner;
};

export default WithSpinner;
