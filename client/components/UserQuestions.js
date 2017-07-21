import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import QuestionInfo from './QuestionInfo';


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
                <div>User Questions</div>
                <div className="collection">
                  {this.renderQuestions()}
                </div>
              </div>
            )
          }
          }

export default UserQuestions;
