import React, { Component } from "react";
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

// Jaise ye component mount ho listner laga do for state change
// aur unmount hone samaya hata do
class App extends Component {
  // ! redux is handling the state now
  // state = {
  //   currentUser: null,
  // };

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    // adding obseverer for auth change: signout to signin
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth); // this is manily used when we signin using google.

        userRef.onSnapshot((snapshot) => {
          // ! Since we are using redux for state management
          // this.setState({
          //   currentUser: {
          //     id: userRef.id,
          //     ...snapshot.data(),
          //   },
          // });
          setCurrentUser({ id: userRef.id, ...snapshot.data() });
        });

        console.log(this.state);
      } else {
        // this.setState({ currentUser: userAuth });
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.props;
    // console.log({ currentUser });
    return (
      <div className="App">
        <div>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/shop">
              <Shop />
            </Route>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  // here we make handler function ofr this component: name can be anything we want
  return { setCurrentUser: (user) => dispatch(setCurrentUser(user)) };
};

const mapStateToProps = ({ user }) => {
  return { currentUser: user.currentUser };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
