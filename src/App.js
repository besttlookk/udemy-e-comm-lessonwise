import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Shop from "./pages/Shop/Shop";
import Auth from "./pages/Auth/Auth";
import { auth } from "./firebase/firebase.config";
import { createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import Checkout from "./pages/Checkout/Checkout";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { selectCollectionsForPreview } from "./redux/shop/shop.selectors";

// Jaise ye component mount ho listner laga do for state change
// aur unmount hone samaya hata do
const App = ({ setCurrentUser, currentUser }) => {
  let unsubscribeFromAuth = null;

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapshot) => {
          setCurrentUser({ id: userRef.id, ...snapshot.data() });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });

    return unsubscribeFromAuth;
  }, []);

  return (
    <div className="App">
      <div>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/shop" component={Shop} />
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route
            path="/authorization"
            exact
            render={() => (currentUser ? <Redirect to="/" /> : <Auth />)}
          />
        </Switch>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  // here we make handler function ofr this component: name can be anything we want
  return { setCurrentUser: (user) => dispatch(setCurrentUser(user)) };
};

// const mapStateToProps = ({ user }) => {
//   return { currentUser: user.currentUser };
// };

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
