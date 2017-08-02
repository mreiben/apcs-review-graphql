import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/GetQuizById';
import { Preloader } from 'react-materialize';
import { Link } from 'react-router';

class QuizResults extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  renderQuestion(i){
    let quiz = this.props.data.quizById;
    let prompt = quiz.prompts[i];
    let userAnswer = quiz.userAnswers[i];
    let correct = quiz.correctAnswers[i];
    let topics = quiz.questionTopics[i].join(", ");
    console.log(quiz);
    return(
      <div>
        Questsion {i + 1}:
        <p>Topics: {topics}</p>
        <p>Prompt: {prompt}</p>
        <p>Correct Answer: {correct}</p>
        <p>Your answer: {userAnswer}</p>
      </div>
    )
  }

  render(){
    if(!this.props.data.quizById){
      return <Preloader size='big' />
    }
    else{
      let quiz = this.props.data.quizById;
      return(
        <div>
          <div className="section">
            <Link to="/dashboard" className="btn dashboard-btn  btn-special z-depth-0">Back</Link>
          </div>
          <h3>Quiz Results:</h3>
          <div className="section">
            <h4>Total Questions: {quiz.userAnswers.length}</h4>
          </div>
          <code>{this.renderQuestion(0)}</code>
        </div>
      );
    }
  }
}

export default graphql(query, {
  options: (ownProps) => ({
    variables: {
      id: ownProps.params.id
    }
  })
})(QuizResults);
