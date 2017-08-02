import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/GetQuestionsWithTopics';
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
      return(
        <QuizView
          questions={this.props.data.questionsWithTopics}
          number={this.props.params.number}
          strict={this.props.params.strict}
          style={this.props.params.style}
          topics={this.props.params.topics}
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
