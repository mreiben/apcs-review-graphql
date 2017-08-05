import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import getQuizById from '../queries/GetQuizById';
import { CollapsibleItem, Icon, Preloader } from 'react-materialize';
import ReactMarkdown from 'react-markdown';
import { hashHistory } from 'react-router';

class QuizInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  getTopics(){
    let topics = [];
    let quiz = this.props.data.quizById;
    for(let i = 0; i < quiz.correctAnswers.length; i++){
      let qTopics = quiz.questionTopics[i];
      for(let t = 0; t < qTopics.length; t++){
        let key = qTopics[t];
        if(topics.indexOf(key) == -1){
          topics.push(key);
        }
      }
    }
    return topics.sort().join(", ");
  }

  onReplayClick(){
    let quiz = this.props.data.quizById;
    let number = quiz.correctAnswers.length;
    let topics = this.getTopics().split(", ").join(",");
    hashHistory.push(`/quiz/name=${this.props.name}&topics=${topics}&number=${number}&strict=false&style=feedback`);
  }

  renderInfo(){
    if(this.props.data.loading){
      return(
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      )
    }
    else{
      let quiz = this.props.data.quizById;
      let qId = quiz.id;
      let date = quiz.date;
      let score = Math.ceil((quiz.correct / quiz.correctAnswers.length)* 100);
      let heading = `${quiz.correctAnswers.length} questions, score: ${score}`;
      let headingColor;
      if(score < 60){
        headingColor = "heading-red";
      } else if(score < 80){
        headingColor = "heading-orange";
      } else {
        headingColor = "heading-green";
      }

      return(
        <div className={headingColor}>
          <p className="collection-item">{heading}
            <i
              className="material-icons icon-right"
              onClick={() => {this.onReplayClick()}}
              >replay</i>
          </p>
          <p className="collection-item"><span className="resultCat">Topics: </span>{this.getTopics()}</p>
          <p className="collection-item"><span className="resultCat">Date: </span>{date}</p>
        </div>
      )
    }
  }

  render(){
    return(
      <div className="collection quiz-info-box">
        {this.renderInfo()}
      </div>
    )
  }
}

export default graphql(getQuizById, {
  options: (ownProps) => ({ variables: { id: ownProps.id } } )
})(QuizInfo)
