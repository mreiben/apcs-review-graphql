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

  render(){
    if(this.props.data.loading){
      return <Preloader size="big" />
    }
    else {
      return(
        <div className="row collection-item">
          <label htmlFor="comment">Add a comment about this question</label>
          <textarea
            id="comment"
            type="text"
            value={this.state.comment}
            className="materialize-textarea"
            onChange={(e) => {this.setState({comment: e.target.value})}}
          />
          <div className="comment-submit-box">
            <div
              className="btn btn-special"
              onClick={() => {this.onHandleCommentSubmit()}}
              >Submit</div>
              <div className="last-update">Question last updated: {this.props.lastUpdate}</div>
          </div>
        </div>
      )
    }
  }
}

export default compose(
  graphql(currentUser)
)(QuestionComment);
