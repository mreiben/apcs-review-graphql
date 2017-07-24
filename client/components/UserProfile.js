import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import { Link } from 'react-router';
import UserQuestions from './UserQuestions';
import { Preloader } from 'react-materialize';

class UserProfile extends Component {
  constructor(props){
    super(props);
  }

  render(){
    if(this.props.data.loading){ return <Preloader size='small' flashing /> }
    return(
      <div>
        <div className="section">
          <Link to="/dashboard" className="btn btn-special">Back</Link>
        </div>
        <h3>User Profile: {this.props.data.user.name}</h3>
        <p>Email: {this.props.data.user.email}</p>
        <h5>My Questions:</h5>
        <UserQuestions questions={this.props.data.user.questions} />
      </div>
    );
  }
}

export default graphql(query)(UserProfile);
