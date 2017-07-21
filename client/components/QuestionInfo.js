import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/GetQuestionById';

class QuestionInfo extends Component {
  constructor(props){
    super(props);
  }

  renderInfo(){
    if(this.props.data.loading){
      return(<div>Loading...</div>)
    }
    else{
      let question = this.props.data.question;
      return(
        <div>
          <div>Question: {question.prompt}</div>
          <div>Code: <code>{question.code}</code></div>
        </div>
      )
    }
  }

  render(){
    return(
      <div className="collection-item">
        {this.renderInfo()}
      </div>
    )
  }
}

export default graphql(query, {
  options: (props) => ({ variables: { id: props.id } } )
})(QuestionInfo);
