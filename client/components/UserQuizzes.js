import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import QuizInfo from './QuizInfo';
import { Collapsible } from 'react-materialize';


class UserQuizzes extends Component {
  constructor(props){
    super(props);
  }

  renderQuizzes(){
    return(
      this.props.quizzes.map((quiz)=>{
        return <QuizInfo key={quiz.id} id={quiz.id} />
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
