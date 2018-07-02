import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

export default withAuth(class Home extends Component {
   

  state = {authenticated : null};

   checkAuthentication = async() => {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  login = async() =>  {
    this.props.auth.login('/');
  }

logout = ()  => {
    this.props.auth.logout('/');
  }

  render() {
    if (this.state.authenticated === null) return null;

    const mainContent = this.state.authenticated ?
       (
         <div>
          <p className="lead">You have entered the member portal, 
            <Link to="staff">click here</Link>
          </p>
          <button className="btn btn-light btn-lg" onClick={this.logout}>Logout</button>
         </div>
       ) :
       (

        <div>
          <p className="lead">If you are a member, please enter your credentials
          </p>
           <button className="btn btn-dark btn-lg" onClick={this.login}>Logout</button>

        </div>
       );

    return (
      <div className="jumbotron">
       <h1 className="display-4">Project 3 Portal</h1>
       {mainContent}
    
      </div>
    );
  }
});