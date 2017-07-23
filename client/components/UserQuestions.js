import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import QuestionInfo from './QuestionInfo';
import { Collapsible } from 'react-materialize';


class UserQuestions extends Component {
  constructor(props){
    super(props);
  }

  renderQuestions(){
    return(
      this.props.questions.map((question)=>{
        return <QuestionInfo key={question.id} id={question.id} />
      })
    )
  }

  render(){
    return(
      <div>
        <Collapsible>
          {this.renderQuestions()}
        </Collapsible>
      </div>
    )
  }
}

export default UserQuestions;
