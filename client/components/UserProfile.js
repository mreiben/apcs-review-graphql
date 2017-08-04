import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import { Link } from 'react-router';
import UserQuestions from './UserQuestions';
import { Preloader, Pagination } from 'react-materialize';

class UserProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      questionPage: 1
    }
  }

  handleQuestionPageSelect(p){
    this.setState({ questionPage: p});
  }

  render(){

    if(this.props.data.loading){ return <Preloader size='small' flashing /> }
    else{

      let questions = this.props.data.user.questions;
      let qCount = questions.length;
      let pages = Math.ceil(qCount / 5);
      let p = this.state.questionPage - 1;
      let subQuestions = questions.slice(p, p + 5);

      return(
        <div>
          <div className="section">
            <Link to="/dashboard" className="btn btn-special">Back</Link>
          </div>
          <h3>User Profile: {this.props.data.user.name}</h3>
          <p>Email: {this.props.data.user.email}</p>
          <h5>My Questions:</h5>
          <Pagination
            items={pages}
            activePage={1}
            maxButtons={5}
            onSelect={(p) => {this.handleQuestionPageSelect(p)}}
          />
          <UserQuestions questions={subQuestions} />
        </div>
      );
    }
  }
}

export default graphql(query)(UserProfile);
