import React, { Component } from "react";

import {
  ErrorImageContainer,
  ErrorImageOverlay,
  ErrorImageText,
  ErrorImageTextDesc,
} from "./error-boundary.styles";

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl="https://i.imgur.com/oCkEbrA.png" />
          <ErrorImageText>This Page is Lost in the Wind</ErrorImageText>
          <ErrorImageTextDesc>
            The child had looked so excited when the clown had presented a large
            red balloon. You had seen this, but in the throes of your morning
            commute you didn’t register it until it was too late. Who asked the
            government to support a fair right through Main Street during a week
            day anyway? Your bike barrelled right between the child and the
            clown and sent the balloon on its merry way. You didn’t turn back to
            see the damage you had done. Later you saw the balloon floating
            outside your office window.
          </ErrorImageTextDesc>
        </ErrorImageOverlay>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
