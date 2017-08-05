import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/GetQuestionsWithTopics';
import currentUser from '../queries/CurrentUser';
import { Preloader } from 'react-materialize';
import QuizView from './QuizView.js';

class QuizHolder extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){
    if(!this.props.data.questionsWithTopics){
      return <Preloader size='big' />
    }
    else{
      //remove questions with low ratings
      let questions = this.props.data.questionsWithTopics.map((question) =>{
        let up = question.upVoters.length;
        let down = question.upVoters.length;
        let rating = (up + 5)/(up + down + 5) * 5;
        if(rating >= 3){
          return question;
        }
      });


      return(
        <QuizView
          questions={questions}
          number={this.props.params.number}
          strict={this.props.params.strict}
          style={this.props.params.style}
          topics={this.props.params.topics}
          user={this.props.data.user}
        />
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
})(QuizHolder);
