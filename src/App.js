import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Form from "./component/Form.js";
import Data from "./component/Data.js";
import Navigation from "./component/Navigation.js";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";

class App extends Component {
  componentDidMount() {
    document.title = "TODO";
  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <Router>
            <Switch>
              <Route exact path="/" component={Form} />
              <Route exact path="/user" component={Data} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
