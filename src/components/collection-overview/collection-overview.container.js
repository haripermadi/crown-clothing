import React from "react";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { connect } from "react-redux";

import { selectIsFetchingCollection } from "../../redux/shop/shop.selectors";
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionOverview from "./collection-overview.component";

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsFetchingCollection,
});

// const CollectionOverviewContainer = connect(mapStateToProps) (WithSpinner(CollectionOverview))

const CollectionOverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(CollectionOverview);

export default CollectionOverviewContainer;
