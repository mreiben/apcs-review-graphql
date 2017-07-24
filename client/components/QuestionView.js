import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/GetQuestions';
import Question from './Question';
import { Link } from 'react-router';

class QuestionView extends Component {

  fetchQuestions(){
    if(this.props.data.loading){ return <div>loading</div> }
    return ( this.props.data.questions.map(({id, prompt, code, answer1, answer2, answer3, answer4, answer5, correct, topics, explanation, user, userName, votes, upVotes})=>{
      return( <Question
        key={id}
        id={id}
        prompt={prompt}
        code={code}
        answer1={answer1}
        answer2={answer2}
        answer3={answer3}
        answer4={answer4}
        answer5={answer5}
        correct={correct}
        topics={topics}
        explanation={explanation}
        userName={userName}
        votes={votes}
        upVotes={upVotes}
              />);
    }))
  }

  render(){
    return(
      <div>
        <div className="section">
          <Link to="/dashboard" className="btn dashboard-btn  btn-special">Back</Link>
        </div>
        <div>{this.fetchQuestions()}</div>
      </div>
    );
  }
}

export default graphql(query)(QuestionView);
