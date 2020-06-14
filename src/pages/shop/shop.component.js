import React from "react";

import "./shop.styles.scss";
import SHOP_DATA from "./shop.data";
import Collection from "../../components/collection/collection.component";

class ShopPage extends React.Component {
  constructor() {
    super();
    this.state = {
      collections: SHOP_DATA,
    };
  }

  render() {
    const { collections } = this.state;
    console.log("shope page---");

    return (
      <div className="shop-page">
        <h1 className="title">Collection</h1>
        {collections.map(({ id, ...others }) => (
          <Collection key={id} {...others} />
        ))}
      </div>
    );
  }
}

export default ShopPage;
