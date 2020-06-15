import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./collection-overview.styles.scss";
import Collection from "../collection/collection.component";
import { selectCollectionArray } from "../../redux/shop/shop.selectors";

const CollectionsOverview = ({ collections }) => {
  return (
    <div className="collections-overview">
      {collections.map(({ id, ...others }) => (
        <Collection key={id} {...others} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionArray,
});

export default connect(mapStateToProps)(CollectionsOverview);
