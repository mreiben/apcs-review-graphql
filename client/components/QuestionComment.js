import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import currentUser from '../queries/CurrentUser';
import { Preloader } from 'react-materialize';

class QuestionComment extends Component {
  constructor(props){
    super(props);
    this.state = {
      comment: ""
    };
  }

  onHandleCommentSubmit(){
    let c = this.state.comment;
    this.props.handleCommentSubmit(c);
    this.setState({comment: ""});
  }

  renderButton(){
    if(this.props.currentUserName === 'anonymous-user'){
      <div
        className="btn btn-special disabled"
        >Comment</div>
    }
    else{
      return (
        <div
          className="btn btn-special"
          onClick={() => {this.onHandleCommentSubmit()}}
          >Comment
        </div>
      )
    }
  }

  renderTextArea(){
    if(this.props.currentUserName === 'anonymous-user'){
      return (
        <div className="errors">Only registered and logged-in users can leave comments or vote for question!</div>
      )
    }
    else {
      return (
        <div>
          <label htmlFor="comment">Add a comment about this question - markdown compatible!</label>
          <textarea
            id="comment"
            type="text"
            value={this.state.comment}
            className="materialize-textarea"
            onChange={(e) => {this.setState({comment: e.target.value})}}
          />
      </div>
      )
    }
  }

  render(){
    if(this.props.data.loading){
      return <Preloader size="big" />
    }
    else {
      return(
        <div className="row collection-item">
          {this.renderTextArea()}
          <div className="comment-submit-box">
            {this.renderButton()}
          </div>
        </div>
      )
    }
  }
}

export default compose(
  graphql(currentUser)
)(QuestionComment);
