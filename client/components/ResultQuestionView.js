import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/GetQuestionById';
import mutation from '../mutations/AddVoteToQuestion';
import { Preloader } from 'react-materialize';
import ReactMarkdown from 'react-markdown';
import { Collapsible, CollapsibleItem } from 'react-materialize';

class ResultQuestionView extends Component {
  constructor(props){
    super(props);
    this.state = {
      upVote: false,
      downVote: false,
      comment: ""
    };
  }

  renderQuestionRating(u, d){
    let rating = ((u + 5)/(u + d + 5)*5).toFixed(1);
    let str = `Current Rating: ${rating}/5.0`
    return <div className="resultCat">{str}</div>;
  }

  handleVote(vote){
    let votedUp = vote == "up";
    if(vote == "up"){
      this.setState({upVote: true, downVote: false});
    }
    else{
      this.setState({upVote: false, downVote: true});
    }
    let qId = this.props.qId;
    let userId = this.props.userId;
    this.props.mutate({
      variables: { qId, userId, vote },
      refetchQueries: [{
        query: query,
        variables: { id: qId }
      }]
    });
  }

  renderVoteButton(upDown){
    let upClass = this.state.upVote ? "btn btn-pressed" : "btn";
    let downClass = this.state.downVote ? "btn btn-red btn-pressed" : "btn btn-red";
    let finalClass = upDown == "up" ? upClass : downClass;
    let icon = upDown == "up" ? 'thumb_up' : 'thumb_down';
    return(
      <div
        className={finalClass}
        onClick={() => {this.handleVote(upDown)}}
        >
          <i className="material-icons">{icon}</i>
      </div>
    )
  }

  handleCommentSubmit(){
    console.log(this.state.comment)
  }

  render(){
    if(this.props.data.loading){
      return <Preloader size='big' />
    }
    else{
      let { prompt, userAnswer, correct, code, explanation, topics, qIndex, qId } = this.props;
      let header = `Question ${qIndex + 1} - Topics: ${topics}`;
      let wasCorrect = userAnswer == correct;
      let icon = wasCorrect ? "check" : "clear";
      let up = this.props.data.question.upVoters.length;
      let down = this.props.data.question.downVoters.length;

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
                    {this.renderVoteButton("up")}
                    {this.renderVoteButton("down")}
                    {this.renderQuestionRating(up, down)}
                  </div>
                  <div className="row">
                    <label htmlFor="comment">Add a comment about this question</label>
                    <textarea
                      id="comment"
                      type="text"
                      value={this.state.comment}
                      className="materialize-textarea"
                      onChange={(e) => {this.setState({comment: e.target.value})}}
                    />
                    <div
                      className="btn btn-special"
                      onClick={()=>{this.handleCommentSubmit()}}
                      >Submit</div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </CollapsibleItem>
      );
    }
  }
}

export default graphql(mutation)(
  graphql(query, {
    options: (ownProps) => ({
      variables: {
        id: ownProps.qId
      }
    })
  })(ResultQuestionView)
);
