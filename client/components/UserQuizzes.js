import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import QuizInfo from './QuizInfo';
import currentUser from '../queries/CurrentUser';
import { Collapsible } from 'react-materialize';
import { Preloader } from 'react-materialize';

class UserQuizzes extends Component {
  constructor(props){
    super(props);
  }

  renderQuizzes(){
    return(
      this.props.quizzes.map((quiz)=>{
        return <QuizInfo key={quiz.id} id={quiz.id} name={this.props.name} />
      })
    )
  }

  render(){
    return(
      <div>
        {this.renderQuizzes()}
      </div>
    )
  }
}

export default UserQuizzes;
