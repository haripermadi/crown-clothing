import React from "react";

import Spinner from "../spinner/spinner.component";

// HOC take component return component
const WithSpinner = (WrappedComponent) => {
  return ({ isLoading, ...other }) => {
    return isLoading ? <Spinner /> : <WrappedComponent {...other} />;
  };
};

export default WithSpinner;
