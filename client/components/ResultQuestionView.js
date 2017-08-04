import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import QuestionComment from './QuestionComment';
import getQuestionById from '../queries/GetQuestionById';
import currentUser from '../queries/CurrentUser';
import addVote from '../mutations/AddVoteToQuestion';
import addCommentToQuestion from '../mutations/AddCommentToQuestion';
import removeCommentFromQuestion from '../mutations/RemoveCommentFromQuestion';
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
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
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
    this.props.addVote({
      variables: { qId, userId, vote },
      refetchQueries: [{
        query: getQuestionById,
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

    handleCommentSubmit(comment){
      let qId = this.props.qId;
      console.log(qId);
      this.props.addCommentToQuestion({
        variables: { qId: qId, comment: comment},
        refetchQueries: [{ query: getQuestionById, variables: { id: qId }}]
      })
    }

    renderComments(comments){
      let parsedComments = comments.map((comment) =>{
        let userName = comment.substring(0, comment.indexOf(":"));
        let message = comment.substring(comment.indexOf(":")+ 1);
        if(this.props.userName == userName){
          return (
            <div className="comment" key={comment}>
              <i
                className="material-icons"
                onClick={()=>{this.handleCommentDelete(comment)}}
              >delete</i>
              <span className="resultCat">{userName}:</span><ReactMarkdown source={message} />
            </div>
          )
        }
        else{
          return <div className="comment" key={comment}>
            <span className="resultCat">{userName}</span><ReactMarkdown source={message} />
          </div>
        }
      });
      return <div className="comment-holder">{parsedComments}</div>;
    }

    handleCommentDelete(comment){
      let qId = this.props.qId;
      this.props.removeCommentFromQuestion({
        variables: { qId: qId, comment: comment},
        refetchQueries: [{ query: getQuestionById, variables: { id: qId }}]
      })
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
        let lastUpdate = this.props.data.question.lastUpdate;
        let comments = this.props.data.question.comments;

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
              <div className="collection-item comments-box">
                <span className="resultcat">Comments: </span>{this.renderComments(comments)}
              </div>
              <QuestionComment
                lastUpdate={lastUpdate}
                handleCommentSubmit={this.handleCommentSubmit}
              />
              <div className="row collection-item">
                {this.renderVoteButton("up")}
                {this.renderVoteButton("down")}
                {this.renderQuestionRating(up, down)}
              </div>
            </div>
          </CollapsibleItem>
        );
      }
    }
  }

  export default compose(
    graphql(addVote, { name: 'addVote' }),
    graphql(addCommentToQuestion, { name: 'addCommentToQuestion' }),
    graphql(removeCommentFromQuestion, { name: 'removeCommentFromQuestion' }),
    graphql(getQuestionById, {
      options: (ownProps) => ({
        variables: {
          id: ownProps.qId
        }
      })
    })
  )(ResultQuestionView);
