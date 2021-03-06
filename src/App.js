import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login'
import Home from './components/pages/Home';
import Staff from './components/pages/Staff';
import webMidi from './components/pages/webMidi';

import './App.css';


function onAuthRequired({ history }) {
  history.push('login');
}
class App extends Component {
  render() {
    return (
      <Router>
        <Security issuer='https://dev-456563.oktapreview.com/oauth2/default'
          client_id='0oafmu09bt6ZLe2rs0h7'
          redirect_uri={window.location.origin + '/implicit/callback'}
          onAuthRequired={onAuthRequired}
        >

          <div className="App">

            <Navbar />
            <div className="container">
              <Route path="/" exact={true} component={Home} />
              <SecureRoute path="/staff" exact={true} component={Staff} />
              <Route path='/login' render={() => <Login baseUrl='https://dev-456563.oktapreview.com' />} />
              <Route path='/implicit/callback' component={ImplicitCallback} />
              <Route path="/webMidi" exact={true} component={webMidi} />
            </div>
          </div>
        </Security>
      </Router>
    );
  }
}

export default App;
