import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/GetQuizById';
import { Preloader } from 'react-materialize';
import { Link } from 'react-router';
import ReactMarkdown from 'react-markdown';
import { Collapsible, CollapsibleItem } from 'react-materialize';
import _ from 'lodash';

class QuizResults extends Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  renderQuestion(i){
    let quiz = this.props.data.quizById;
    let prompt = quiz.prompts[i];
    let userAnswer = quiz.userAnswers[i];
    let correct = quiz.correctAnswers[i];
    let code = quiz.codes[i];
    let explanation = quiz.explanations[i];
    let topics = quiz.questionTopics[i].join(", ");
    let header = `Question ${i + 1} - Topics: ${topics}`;
    let wasCorrect = userAnswer == correct;
    let icon = wasCorrect ? "check" : "clear";

    return(
      <CollapsibleItem header={header} icon={icon} key={i}>
        <div className="collection">
          <Collapsible className="sub-collapse">
            <CollapsibleItem header="Prompt" icon="live_help">
              <div className="collection-item"><ReactMarkdown source={prompt} /></div>
            </CollapsibleItem>
            <CollapsibleItem header="Code" icon="code">
              <div className="collection-item"><code className="code">{code}</code></div>
            </CollapsibleItem>
            <CollapsibleItem header="Explanation" icon="lightbulb_outline">
              <div className="collection-item"><ReactMarkdown source={explanation} /></div>
            </CollapsibleItem>
          </Collapsible>
          <div className="collection-item"><span className="resultCat">Correct Answer: </span><ReactMarkdown source={correct} /></div>
          <div className="collection-item"><span className="resultCat">Your Answer: </span><ReactMarkdown source={userAnswer} /></div>
        </div>
      </CollapsibleItem>
    )
  }

  renderQuestions(){
    let indexArr = _.range(0, this.props.data.quizById.prompts.length);
    return indexArr.map((i) => {return this.renderQuestion(i)});
  }

  render(){
    if(!this.props.data.quizById){
      return <Preloader size='big' />
    }
    else{
      let quiz = this.props.data.quizById;
      return(
        <div>
          <div className="section">
            <Link to="/dashboard" className="btn dashboard-btn  btn-special z-depth-0">Back</Link>
          </div>
          <h3>Quiz Results:</h3>
          <div className="section">
            <h4>Total Questions: {quiz.userAnswers.length}</h4>
          </div>
          <Collapsible>{this.renderQuestions()}</Collapsible>
        </div>
      );
    }
  }
}

export default graphql(query, {
  options: (ownProps) => ({
    variables: {
      id: ownProps.params.id
    }
  })
})(QuizResults);
