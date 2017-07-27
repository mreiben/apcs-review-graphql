import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/GetQuestionsWithTopics';
import { Link } from 'react-router';
import { Preloader } from 'react-materialize';
import ReactMarkdown from 'react-markdown';

class QuizView extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentQuestionIndex: 0,
      currentAnswer: ""
    };
  }

  renderTypesList(){
    let topics = this.props.location.query.topics.split(",").join(", ");
    if(topics.length < 50){
      return topics
    }
    else {
      return topics.substring(0,50) + "...";
    }
  }

  renderNumber(){
    let number = this.props.location.query.number;
    if(number == 1){
      return "1 Question";
    }
    else {
      return `${number} Questions`;
    }
  }

  renderStrict(){
    let strict = this.props.location.query.strict;
    if(strict){
      return "Strict Mode: On";
    }
    else {
      return "Strict Mode: Off"
    }
  }

  shuffle(array){
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  renderRating(votes, upVotes){
    if(votes == 0){
      return "unrated";
    }
    else {
      return (5 * (upvotes / votes)).toFixed(2);
    }
  }

  handleAnswerSelect(answer){
    this.setState({ currentAnswer: answer});
  }

  handleAnswerSubmit(){
    console.log("what?");
    if(this.state.currentIndex == this.props.location.query.number -1){
      console.log("quiz done!");
    }
    else{
      let i = this.state.currentIndex;
      console.log(i);
      this.setState({ currentIndex: i + 1 });
    }
  }

  renderQuestion(i){
    if(!this.props.data.questionsWithTopics){
      return <Preloader size='big' />
    }
    else{
      let questions = this.props.data.questionsWithTopics;
      let question = questions[i];
      let answers = [question.correct, question.answer2, question.answer3, question.answer4, question.answer5];
      answers = this.shuffle(answers);
      return (
        <div>
          <h5>Question {this.state.currentQuestionIndex + 1}</h5>
          <ReactMarkdown source={question.prompt} />
          <code className="code">{question.code}</code>
          <ul className="collection">
            <li className="answer-choice"><ReactMarkdown source={answers[0]}/></li>
            <li className="answer-choice"><ReactMarkdown source={answers[1]}/></li>
            <li className="answer-choice"><ReactMarkdown source={answers[2]}/></li>
            <li className="answer-choice"><ReactMarkdown source={answers[3]}/></li>
            <li className="answer-choice"><ReactMarkdown source={answers[4]}/></li>
          </ul>
          <div className="section">
            <p>Topics: {question.topics.map((topic)=>{return <span className="topic-box" key={topic}>{topic}</span>})}</p>
            <p>Explanation: </p>
            <ReactMarkdown source={question.explanation} />
            <p>rating: {this.renderRating(question.votes, question.upVotes)}</p>
            <p>Created by: {question.userName}</p>
          </div>
        </div>
      );
    }
  }

  handleAnswerSubmit(){

  }

  render(){

    return(
      <div>
        <div className="section">
          <div id="quiz-info-bar" className="quiz-header z-depth-2">
            <Link to="/dashboard" className="btn dashboard-btn  btn-special quiz-header z-depth-0">Back</Link>
            <div>{this.renderNumber()}</div>
            <div>Topics: {this.renderTypesList()}</div>
            <div>{this.renderStrict()}</div>
          </div>
        </div>
        <div>
          {this.renderQuestion(this.state.currentQuestionIndex)}
          <button
            className="btn btn-special"
            onClick={this.handleAnswerSubmit}
            >Submit Answer & Next Question</button>
        </div>
      </div>
    );
  }
}

export default graphql(query, {
  options: (ownProps) => ({
    variables: {
      topics: ["loops"],
      strict: false
    }
  })
})(QuizView);
