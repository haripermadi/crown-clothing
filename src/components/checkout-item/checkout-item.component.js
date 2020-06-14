import React from "react";
import { connect } from "react-redux";

import "./checkout-item.styles.scss";

import {
  clearItemCart,
  addItem,
  removeItem,
} from "../../redux/cart/cart.action";

const CheckoutItem = ({ cartItem, removeItem, decreaseQty, addQty }) => {
  const { name, quantity, price, imageUrl } = cartItem;
  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="product" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => decreaseQty(cartItem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addQty(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <span className="remove-button" onClick={() => removeItem(cartItem)}>
        &#10005;
      </span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  removeItem: (item) => dispatch(clearItemCart(item)),
  decreaseQty: (item) => dispatch(removeItem(item)),
  addQty: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
