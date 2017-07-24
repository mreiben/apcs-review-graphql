import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/GetQuestions';
import { hashHistory } from 'react-router';
import ReactMarkdown from 'react-markdown';
const Marked = require('react-remarkable');

class Question extends Component {
  constructor(props){
    super(props);

    this.state = { questions: [] };
  }

  mixArray(array) { //Fisher-Yates shuffle
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

  render(){

    let answers = [this.props.answer1, this.props.answer2, this.props.answer3, this.props.answer4, this.props.answer5];
    let mixedAnswers = this.mixArray(answers);

    return(
      <div>
        <h5>Question</h5>
        <ReactMarkdown source={this.props.prompt} />
        <code className="code">{this.props.code}</code>
        <ul className="collection">
          <li className="answer-choice"><ReactMarkdown source={mixedAnswers[0]}/></li>
          <li className="answer-choice"><ReactMarkdown source={mixedAnswers[1]}/></li>
          <li className="answer-choice"><ReactMarkdown source={mixedAnswers[2]}/></li>
          <li className="answer-choice"><ReactMarkdown source={mixedAnswers[3]}/></li>
          <li className="answer-choice"><ReactMarkdown source={mixedAnswers[4]}/></li>
        </ul>
        <div className="section">
          <p>Topics: {this.props.topics.map((topic)=>{return <span className="topic-box" key={topic}>{topic}</span>})}</p>
          <p>Explanation: </p>
          <ReactMarkdown source={this.props.explanation} />
          <p>Votes: {this.props.votes}</p>
          <p>Created by: {this.props.userName}</p>
        </div>
      </div>
    );
  }
}

export default Question;
