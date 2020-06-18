import React, { useEffect, lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./shop.styles.scss";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";
import Spinner from "../../components/spinner/spinner.component";

const CollectionsOverviewContainer = lazy(() =>
  import("../../components/collection-overview/collection-overview.container")
);
const CollectionPageContainer = lazy(() =>
  import("../collection/collection.container")
);

const ShopPage = ({ fetchCollection, match, isCollectionLoaded }) => {
  useEffect(() => {
    fetchCollection();
  }, []);

  return (
    <div className="shop-page">
      <Suspense fallback={<Spinner />}>
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
      </Suspense>
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
