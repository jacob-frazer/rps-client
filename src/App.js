import React, { Component } from "react";

import SocketConnector from "./components/socketConnector";

import ACTIONS from "./modules/action";
import { connect } from "react-redux";
import socketIOClient from "socket.io-client";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './css/App.css'

class App extends Component {

  // might need something here

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/rps">Rock, Paper, Scissors!</Link>
            </li>
          </ul>

          <hr />

          <Switch>
            <Route exact path="/">
              <h1>This is the homepage - make me not shit x</h1>
            </Route>
            <Route path="/rps">
              <SocketConnector/>
            </Route>
          </Switch>
      </div>
    </Router>

    );
  }
}
export default (App);