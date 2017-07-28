import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/GetQuestionsWithTopics';
import { Link } from 'react-router';
import { Preloader, Input } from 'react-materialize';
import ReactMarkdown from 'react-markdown';
import Question from './Question.js';

class QuizView extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentQuestionIndex: 0,
      currentAnswer: "",
      userAnswers: [],
      correctAnswers: []
    };
  }

  renderTypesList(){
    let topics = this.props.params.topics.split(",").join(", ");
    if(topics.length < 50){
      return topics
    }
    else {
      return topics.substring(0,50) + "...";
    }
  }

  renderNumber(){
    let number = this.props.params.number;
    if(number == 1){
      return "1 Question";
    }
    else {
      return `${number} Questions`;
    }
  }

  renderStrict(){
    let strict = this.props.params.strict;
    if(strict){
      return "Strict Mode: On";
    }
    else {
      return "Strict Mode: Off"
    }
  }

  renderQuestion(){
    let question = this.props.data.questionsWithTopics[this.state.currentQuestionIndex];
    let { prompt, code, answer1, answer2, answer3, answer4, answer5, correct, explanation, topics, votes, upVotes, userName } = question;
    let style = this.props.routeParams.style;
    let number = this.state.currentQuestionIndex + 1;
    return(
      <Question
        prompt={prompt}
        code={code}
        answer1={answer1}
        answer2={answer2}
        answer3={answer3}
        answer4={answer4}
        answer5={answer5}
        correct={correct}
        explanation={explanation}
        topics={topics}
        number={number}
        style={style}
        votes={votes}
        upVotes={upVotes}
        userName={userName}
        onAnswerSelect={this.onAnswerSelect.bind(this)}
        onAnswerSubmit={this.onAnswerSubmit.bind(this)}
      />
    )
  }

  onAnswerSelect(answer){
    this.setState({ currentAnswer: answer});
  }

  onAnswerSubmit(){
    if(this.state.currentQuestionIndex == this.props.routeParams.number -1){
      console.log("quiz done!");
      //navigate to quiz results page
    }
    else{
      let i = this.state.currentQuestionIndex;
      let { userAnswers, correctAnswers } = this.state;
      userAnswers.push(this.state.currentAnswer);
      correctAnswers.push(this.props.data.questionsWithTopics[i].correct);
      this.setState({
        currentQuestionIndex: i + 1,
        userAnswers: userAnswers,
        correctAnswers: correctAnswers,
        currentAnswer: ""
      });
    }
  }

  render(){
    if(!this.props.data.questionsWithTopics){
      return <Preloader size='big' />
    }
    else{
      // let question = this.props.data.questionsWithTopics[this.state.currentQuestionIndex];
      // let { prompt, code, answer1, answer2, answer3, answer4, answer5, correct, explanation, topics, votes, upVotes, userName } = question;
      // let style = this.props.routeParams.style;
      // let number = this.state.currentQuestionIndex + 1;
      return(
        <div>
          <div className="section">
            <div id="quiz-info-bar" className="quiz-header z-depth-2">
              <Link to="/dashboard" className="btn dashboard-btn  btn-special quiz-header z-depth-0">Back</Link>
              <div>{this.renderNumber()}</div>
              <div>Topics: {this.renderTypesList()}</div>
              <div>{this.renderStrict()}</div>
            </div>
            {this.renderQuestion()}
          </div>
        </div>
      );
    }
  }
}

export default graphql(query, {
  options: (ownProps) => ({
    variables: {
      topics: ownProps.params.topics.split(","),
      strict: (ownProps.params.strict == "true")
    }
  })
})(QuizView);
