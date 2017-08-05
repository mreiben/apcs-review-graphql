import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/GetQuestionById';
import currentUser from '../queries/CurrentUser';
import { CollapsibleItem, Icon, Modal, Preloader } from 'react-materialize';
import ReactMarkdown from 'react-markdown';
import questionDelete from '../mutations/QuestionDelete';
import ReactModal from 'react-modal';
import { hashHistory } from 'react-router';

class QuestionInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModal: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  componentWillMount(){
    this.state = {
      showModal: false
    }
    //this.forceUpdate();
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleEditClick(id){
    hashHistory.push(`/edit/${id}`);
  }

  deleteQuestion(){
    const id = this.props.id;
    this.props.mutate({
      variables: { id: id },
      refetchQueries: [
        {
          query: currentUser
        }
      ]
    }).then(this.handleCloseModal())
  }

  handleCommentDelete(){
    console.log("deleting comment...");
  }

  renderComments(comments){
    if(comments.length == 0){
      return "";
    }
    else{
      let parsedComments = comments.map((comment) =>{
        let userName = comment.substring(0, comment.indexOf(":"));
        let message = comment.substring(comment.indexOf(":")+ 1);
        return (
          <div key={comment} className="comment" key={comment}>
            <i
              className="material-icons danger-icon"
              onClick={()=>{this.handleCommentDelete(comment)}}
              >delete</i>
              <span className="resultCat">{userName}:</span><ReactMarkdown source={message} />
            </div>
          )
        });
        return <div className="comment-holder profile-comments-holder">{parsedComments}</div>;
      }
    }

    renderInfo(){
      if(this.props.data.loading){
        return(
          <div className="collection-item"><Preloader size='small' flashing /></div>
        )
      }
      else{
        let question = this.props.data.question;
        let up = question.upVoters.length;
        let down = question.downVoters.length;
        let rating = ((up + 5)/(up + down + 5) * 5).toFixed(1);
        const qId = question.id;
        const modalStyle = {
          overlay: {
            backgroundColor: '#f44336',
            position: 'fixed',
            borderRadius: '4px',
            height: '210px',
            left: 100,
            right: 100,
            top: 100
          },
          content: {
            position                   : 'absolute',
            top                        : '10px',
            left                       : '10px',
            right                      : '10px',
            bottom                     : '10px',
            border                     : '1px solid #ccc',
            background                 : '#fff',
            overflow                   : 'auto',
            WebkitOverflowScrolling    : 'touch',
            borderRadius               : '4px',
            outline                    : 'none',
            padding                    : '20px'
          }
        }

        return(
          <CollapsibleItem key={qId} header={question.prompt.substring(0,80) + "..."} icon='arrow_drop_down'>
            <div className="collection">
              <div className="collection-item"><code className="code">{question.code}</code></div>
              <div className="answer"><Icon className="collection-icon green-icon">check_circle</Icon><ReactMarkdown source={question.correct}/></div>
              <div className="answer"><Icon className="collection-icon red-icon">block</Icon><ReactMarkdown source={question.answer2}/></div>
              <div className="answer"><Icon className="collection-icon red-icon">block</Icon><ReactMarkdown source={question.answer3}/></div>
              <div className="answer"><Icon className="collection-icon red-icon">block</Icon><ReactMarkdown source={question.answer4}/></div>
              <div className="answer"><Icon className="collection-icon red-icon">block</Icon><ReactMarkdown source={question.answer5}/></div>
              <div className="collection-item"><Icon className="collection-icon blue-icon">lightbulb_outline</Icon><ReactMarkdown source={question.explanation} /></div>
              <div className="collection-item"><Icon className="collection-icon blue-icon">list</Icon>{question.topics.map((topic)=>{return <span className="topic-list" key={topic}>{topic}</span>})}</div>
              <div className="collection-item"><Icon className="collection-icon blue-icon">thumbs_up_down</Icon>Rating: {rating}/5.0</div>
              <div className="collection-item"><Icon className="collection-icon blue-icon">chat</Icon>
              Comments: {this.renderComments(question.comments)}
            </div>
            <div className="section">
              <div
                className="btn btn-special btn-left"
                onClick={() => this.handleEditClick(qId)}
                >Edit Question</div>
                <div className="btn btn-danger right btn-right" onClick={this.handleOpenModal}>Delete Question</div>
              </div>
              <ReactModal
                isOpen={this.state.showModal}
                contentLabel="Delete Warning"
                style={modalStyle}
                >
                  <h5>Are you sure you want to delete this question?</h5>
                  <p>This action can't be undone!</p>
                  <div className="btn btn-special" onClick={this.handleCloseModal}>Cancel</div>
                  <div className="btn btn-danger" onClick={this.deleteQuestion}>I'm sure, delete!</div>
                </ReactModal>
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

    export default graphql(currentUser)(
      graphql(questionDelete, {
        options: (props) => ({ variables: { id: props.id } } )
      })(
        graphql(query, {
          options: (props) => ({ variables: { id: props.id } } )
        })(QuestionInfo)
      )
    );
