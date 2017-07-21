import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import { Link } from 'react-router';

//wrapped by requireAuth in index.js routes

class Dashboard extends Component {

  renderLanding(){
    const { loading, user } = this.props.data;
    if(loading){ return <div />; }

    if(user){ return(
      <div>
        <div className="section">
          <Link to="/create" className="waves-effect waves-light btn dashboard-btn">Create Question</Link>
          <Link to="/questions" className="waves-effect waves-light btn dashboard-btn">Practice!</Link>
          <Link to="/profile" className="waves-effect waves-light btn dashboard-btn">My Profile</Link>
        </div>
        <h3>Welcome to your dashboard!</h3>
        <p>Some stats will go here later...</p>
      </div>
      );
    }
    else {
      return(
        <p>Sign up or sign in to get started!</p>
      );
    }
  }

  render(){
    return(
      <div>{this.renderLanding()}</div>
    );
  }
}

export default graphql(query)(Dashboard);
