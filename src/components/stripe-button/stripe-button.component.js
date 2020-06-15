import React from "react";
import StripeCheckout from "react-stripe-checkout";

import "./stripe-button.styles.scss";

const StripeButton = ({ price }) => {
  const priceForStripe = price * 100; //cent
  const publishableKey =
    "pk_test_51GuBurDVsgQwtT55rsgWhm1msQ3eIhj8X2ITA5hjF6onCEyNha4jEddbV7Dq2LouqYV9Z67pfWAOQfkapiLNBOoW00aaMtftnR";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total payment is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeButton;
