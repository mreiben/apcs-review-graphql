import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/GetQuestions';
import { hashHistory } from 'react-router';

class Question extends Component {
  constructor(props){
    super(props);

    this.state = { questions: [] };
  }

  render(){
    return(
      <div>
        <h5>Question</h5>
        <p>{this.props.prompt}</p>
        <blockquote className="code">{this.props.code.split("\n").map(function(item){
          return(
            <span key={item}>{item}<br/></span>
          )
        })}</blockquote>
        <ul className="collection">
          <a href="#!" className="collection-item">{this.props.answer1}</a>
          <a href="#!" className="collection-item">{this.props.answer2}</a>
          <a href="#!" className="collection-item">{this.props.answer3}</a>
          <a href="#!" className="collection-item">{this.props.answer4}</a>
          <a href="#!" className="collection-item">{this.props.answer5}</a>
        </ul>
        <p>Topics: {this.props.topics}</p>
        <p>Explanation: {this.props.explanation}</p>
      </div>
    );
  }
}

export default Question;
