import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import "./App.css";
import './bootstrap.css';
import "bootstrap/dist/css/bootstrap.css";

import Home from "./views/screens/Home/Home";
import Navbar from "./views/components/Navbar/Navbar";
import AuthScreen from "./views/screens/Auth/AuthScreen"
import RegisterScreen from "./views/screens/Auth/register";

class App extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={AuthScreen} />
          <Route exact path="/register" component={RegisterScreen} />
        </Switch>
        <div style={{ height: "120px" }} />
      </>
    );
  }
}

export default withRouter(App);
