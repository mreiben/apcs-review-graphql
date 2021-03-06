import React, { Component } from 'react';
import AuthFormSignup from './AuthFormSignup';
import mutation from '../mutations/Signup';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import { hashHistory } from 'react-router';

class SignupForm extends Component {
  constructor(props){
    super(props);

    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps){
    //check if there is a valid user when remounting
    if (!this.props.data.user && nextProps.data.user){
      //if user is logged in, redirect to dashboard
      hashHistory.push('/dashboard');
    }
  }

  onSubmit({ email, password, name }){
    this.props.mutate({
      variables: { email, password, name },
      refetchQueries: [{ query }]
    }).catch(res=> {
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState({ errors });
    });
  }

  render(){
    return(
      <div>
        <h3>Sign Up</h3>
        <AuthFormSignup
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(query)(
  graphql(mutation)(SignupForm)
);
