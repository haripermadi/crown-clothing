import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./shop.styles.scss";
import CollectionsOverviewContainer from "../../components/collection-overview/collection-overview.container";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

import CollectionPageContainer from "../collection/collection.container";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import {
  selectIsFetchingCollection,
  selectIsCollectionsLoaded,
} from "../../redux/shop/shop.selectors";

// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ fetchCollection, match, isCollectionLoaded }) => {
  useEffect(() => {
    fetchCollection();
  }, []);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
        // render={(props) => (
        //   <CollectionPageWithSpinner
        //     isLoading={!isCollectionLoaded}
        //     {...props}
        //   />
        // )}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isCollectionLoaded: selectIsCollectionsLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollection: () => dispatch(fetchCollectionsStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
