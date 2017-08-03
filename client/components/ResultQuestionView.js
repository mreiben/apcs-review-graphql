import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/GetQuizById';
import { Preloader } from 'react-materialize';
import ReactMarkdown from 'react-markdown';
import { Collapsible, CollapsibleItem } from 'react-materialize';

class ResultQuestionView extends Component {
  constructor(props){
    super(props);
    this.state = {
      // upVote = false,
      // downVote = false,
      // comment = ""
    };
  }

  render(){
    let {prompt, userAnswer, correct, code, explanation, topics, qIndex, qId } = this.props;
    let header = `Question ${qIndex + 1} - Topics: ${topics}`;
    let wasCorrect = userAnswer == correct;
    let icon = wasCorrect ? "check" : "clear";

    return(
      <CollapsibleItem header={header} icon={icon} key={this.props.qIndex}>
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
          <div className="collection-item vote-holder">
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="btn"><i className="material-icons">thumb_up</i></div>
                  <div className="btn btn-red"><i className="material-icons">thumb_down</i></div>
                </div>
                <div className="row">
                  <label htmlFor="comment">Add a comment about this question</label>
                  <input id="comment" type="text" className="validate"/>
                  <div className="btn btn-special">Submit</div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </CollapsibleItem>
    );
  }
}

export default ResultQuestionView;
