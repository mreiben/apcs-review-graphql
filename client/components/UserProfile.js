import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import { Link } from 'react-router';

class UserProfile extends Component {
  constructor(props){
    super(props);
  }


  render(){
    if(this.props.data.loading){ return <div>loading</div> }
    return(
      <div>
        <div className="section">
          <Link to="/dashboard" className="waves-effect waves-light btn">Back</Link>
        </div>
        <h4>User Profile Here</h4>
        <p>{this.props.data.user.email}</p>
      </div>
    );
  }
}

export default graphql(query)(UserProfile);
