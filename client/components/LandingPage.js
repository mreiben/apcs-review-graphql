import React, { Component } from 'react';
import Header from './Header';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import { Link, hashHistory } from 'react-router';

class LandingPage extends Component {

  renderLanding(loading, user){
    if(loading){ return <div />; }
    if(!user){
      return(
        <div>
          <h3>AP Computer Science is hard...</h3>
          <h5>Even worse, it's hard to find multiple-choice questions to practice on.</h5>
          <p>This app aims to solve that problem by allowing users to create,
          review, and practice with test-level questions.</p>
          <p><Link to='/signup'>Sign up</Link> or <Link to='/login'>log in</Link> to get started!</p>
        </div>
      );
    }
    else{
      return(
        <p>Go to your <Link to='/dashboard'>dashboard</Link> to get started!</p>
      );
    }
  }

  render(){
    const { loading, user } = this.props.data;

    return (
      <div>
        {this.renderLanding(loading, user)}
      </div>
    );
  }
}

export default graphql(query)(LandingPage);
