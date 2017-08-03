import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import questionQuery from '../queries/GetQuestionById';
import addVote from '../mutations/AddVoteToQuestion';
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

  handleVote(direction){
    let upVoted = direction == "up";
    let qId = this.props.qId;
    let userId = this.props.userId;
    let vote = upVoted ? "up" : "down";
    this.props.mutate({
      variables: { qId, userId, vote },
      refetchQueries: [{
        query: questionQuery,
        variables: { id: qId }
      }]
    })
    .then(() => this.setState({upVote: upVoted, downVote: !upVoted}));
  }

  handleCommentSubmit(){
    console.log("adding comment: ", this.state.comment);
    this.setState({comment: ""});
  }

  renderThumbUp(){
    let thumbClass = this.state.upVote ? "btn btn-pressed" : "btn";
    return(
      <div className={thumbClass}
        onClick={() => this.handleVote("up")}
        >
        <i className="material-icons">thumb_up</i>
      </div>
    )
  }

  renderThumbDown(){
    let thumbClass = this.state.downVote ? "btn btn-red btn-pressed" : "btn btn-red";
    return(
      <div className={thumbClass}
        onClick={() => this.handleVote("down")}
        >
        <i className="material-icons">thumb_down</i>
      </div>
    )
  }

  render(){
    if(this.props.data.loading){
      return <Preloader size='big' />
    }
    else{
      let {prompt, userAnswer, correct, code, explanation, topics, qIndex, qId } = this.props;
      let header = `Question ${qIndex + 1} - Topics: ${topics}`;
      let wasCorrect = userAnswer == correct;
      let icon = wasCorrect ? "check" : "clear";
      let q = this.props.data.question;
      let ups = q.upVoters.length;
      let downs = q.downVoters.length;
      let rating = (((ups + 5)/(ups + downs + 5)) * 5).toFixed(1);

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
                    {this.renderThumbUp()}
                    {this.renderThumbDown()}
                    <div className="resultCat">Current Rating: {rating}/5</div>
                  </div>
                  <div className="row">
                    <label htmlFor="comment">Add a comment about this question</label>
                    <textarea
                      id="comment"
                      type="text"
                      className="materialize-textarea"
                      value={this.state.comment}
                      onChange={(e) => this.setState({comment: e.target.value})}
                    />
                    <div
                      className="btn btn-special"
                      onClick={() => this.handleCommentSubmit()}
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

export default graphql(addVote)(
  graphql(questionQuery, {
    options: (ownProps) => ({
      variables: {
        id: ownProps.qId
      }
    })
  })(ResultQuestionView)
);
