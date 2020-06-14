import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInUp from "./pages/signinup/signinup.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.action";

class App extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     currentUser: null,
  //   };
  // }

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    auth.onAuthStateChanged(async (userAuth) => {
      console.log(userAuth);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          // console.log("snapshot---", snapShot);
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      } else {
        setCurrentUser(null);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    console.log("App---render---", this.state);

    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInUp} />
        </Switch>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   currentUser : state.user.currentUser
// })

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
