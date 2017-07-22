import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/GetQuestionById';
import { CollapsibleItem, Icon } from 'react-materialize';
import ReactMarkdown from 'react-markdown';

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
        <CollapsibleItem header={question.prompt} icon='arrow_drop_down'>
          <div className="collection">
            <div className="collection-item"><code className="code">{question.code}</code></div>
            <div className="collection-item"><Icon className="collection-icon">check_circle</Icon>{question.correct}</div>
            <div className="collection-item"><Icon className="collection-icon">block</Icon>{question.answer2}</div>
            <div className="collection-item"><Icon className="collection-icon">block</Icon>{question.answer3}</div>
            <div className="collection-item"><Icon className="collection-icon">block</Icon>{question.answer4}</div>
            <div className="collection-item"><Icon className="collection-icon">block</Icon>{question.answer5}</div>
            <div className="collection-item"><Icon className="collection-icon">live_help</Icon><ReactMarkdown source={question.explanation} /></div>
            <div className="collection-item"><Icon className="collection-icon">list</Icon>{question.topics.map((topic)=>{return <span className="topic-list" key={topic}>{topic}</span>})}</div>
          </div>
        </CollapsibleItem>
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
