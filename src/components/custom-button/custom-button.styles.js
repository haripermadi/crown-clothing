import styled, { css } from "styled-components";

const buttonStyles = css`
  background-color: black;
  border: none;
  color: white;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

const invertedButtonStyle = css`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover {
    background-color: black;
    color: white;
    border: none;
  }
`;

const googleSignInStyles = css`
  background-color: #4285f4;
  color: white;
  border: none;

  &:hover {
    background-color: #357ae8;
    border: none;
  }
`;

const getButtonStyles = (props) => {
  if (props.isGoogleSignIn) {
    return googleSignInStyles;
  }

  return props.inverted ? invertedButtonStyle : buttonStyles;
};

export const CustomButtonContainer = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  font-family: "Open Sans Condensed";
  font-weight: bolder;
  font-size: 15px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  cursor: pointer;
  text-transform: uppercase;
  display: flex;
  justify-content: center;

  ${getButtonStyles}
`;