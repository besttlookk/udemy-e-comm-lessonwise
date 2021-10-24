/*

import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Shop from "./pages/Shop/Shop";
import Auth from "./pages/Auth/Auth";
import { connect } from "react-redux";
import { checkUserSession, setCurrentUser } from "./redux/user/user.actions";
import Checkout from "./pages/Checkout/Checkout";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { selectCollectionsForPreview } from "./redux/shop/shop.selectors";

// Jaise ye component mount ho listner laga do for state change
// aur unmount hone samaya hata do
const App = ({ currentUser, checkUserSession }) => {
  // let unsubscribeFromAuth = null;

  useEffect(() => {
    // ! we no longer listening to onAuthStateChange....reudux will handle now
    //   unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
    //     if (userAuth) {
    //       const userRef = await createUserProfileDocument(userAuth);
    //       userRef.onSnapshot((snapshot) => {
    //         setCurrentUser({ id: userRef.id, ...snapshot.data() });
    //       });
    //     } else {
    //       setCurrentUser(userAuth);
    //     }
    //   });
    //   return unsubscribeFromAuth;

    checkUserSession();
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

// const mapStateToProps = ({ user }) => {
//   return { currentUser: user.currentUser };
// };

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

*/

//! ================== With hooks ================
import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Shop from "./pages/Shop/Shop";
import Auth from "./pages/Auth/Auth";
import { useSelector, useDispatch } from "react-redux";
import { checkUserSession } from "./redux/user/user.actions";
import Checkout from "./pages/Checkout/Checkout";
import { selectCurrentUser } from "./redux/user/user.selectors";

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

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

export default App;
