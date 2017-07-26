import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/GetQuestionsWithTopics';
import { Link } from 'react-router';

class QuizView extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentQuestinIndex: 0
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

  render(){
    return(
      <div>
        <div className="section">
          <div id="quiz-info-bar" className="quiz-header z-depth-2">
            <Link to="/dashboard" className="btn dashboard-btn  btn-special quiz-header z-depth-0">Back</Link>
            <div>Topics: {this.renderTypesList()}</div>
            <div>{this.renderNumber()}</div>
            <div>Strict mode: {this.props.location.query.strict}</div>
          </div>
        </div>
        <div>
          question here
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
