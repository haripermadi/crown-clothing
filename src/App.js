import React, { useEffect, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Header from "./components/header/header.component";

import { selectCurrentUser } from "./redux/user/user.selector";
import { selectCollectionArray } from "./redux/shop/shop.selectors";
import { checkUserSession } from "./redux/user/user.action";
import { GlobalStyles } from "./global.style";
import Spinner from "./components/spinner/spinner.component";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const SignInUp = lazy(() => import("./pages/signinup/signinup.component"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));

const App = (props) => {
  // componentDidMount() {
  //   this.props.checkUserSession();
  // }
  useEffect(() => {
    props.checkUserSession();
  }, [props.checkUserSession]);

  // console.log("App---render---", props);

  return (
    <div className="App">
      <GlobalStyles />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route
              exact
              path="/signin"
              render={() => {
                return props.currentUser ? <Redirect to="/" /> : <SignInUp />;
              }}
            />
            <Route exact path="/checkout" component={CheckoutPage} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionArray: selectCollectionArray,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
