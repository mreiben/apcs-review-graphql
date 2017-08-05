import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import { Link } from 'react-router';
import UserQuestions from './UserQuestions';
import UserQuizzes from './UserQuizzes';
import { Preloader, Pagination } from 'react-materialize';

class UserProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      questionPage: 1,
      quizPage: 1
    }
  }

  handleQuestionPageSelect(p){
    this.setState({ questionPage: p});
  }

  handleQuizPageSelect(p){
    this.setState({ quizPage: p});
  }

  render(){

    if(this.props.data.loading){ return <Preloader size='small' flashing /> }
    else{

      let questions = this.props.data.user.questions;
      let qCount = questions.length;
      let pages = Math.ceil(qCount / 5);
      let p = this.state.questionPage - 1;
      let subQuestions = questions.slice(p, p + 5);

      let quizzes = this.props.data.user.quizzes;
      let quizPages = Math.ceil(this.props.data.user.quizzes.length / 2);
      let q = this.state.quizPage -1;
      let subQuizzes = quizzes.slice(q, q + 2);

      return(
        <div>
          <div className="section">
            <Link to="/dashboard" className="btn btn-special">Back</Link>
          </div>
          <h3>User Profile: {this.props.data.user.name}</h3>
          <h5>Email: {this.props.data.user.email}</h5>
          <h5 className="section">My Questions:</h5>
          <Pagination
            items={pages}
            activePage={1}
            maxButtons={5}
            onSelect={(p) => {this.handleQuestionPageSelect(p)}}
          />
          <UserQuestions questions={subQuestions} />

          <h5 className="section">My Quizzes:</h5>
          <Pagination
            items={quizPages}
            activePage={1}
            maxButtons={5}
            onSelect={(p) => {this.handleQuizPageSelect(p)}}
          />
          <UserQuizzes quizzes={subQuizzes} />
        </div>
      );
    }
  }
}

export default graphql(query)(UserProfile);
