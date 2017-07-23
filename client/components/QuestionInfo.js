import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/GetQuestionById';
import currentUser from '../queries/CurrentUser';
import { CollapsibleItem, Icon, Modal } from 'react-materialize';
import ReactMarkdown from 'react-markdown';
import questionDelete from '../mutations/QuestionDelete';
import ReactModal from 'react-modal';

class QuestionInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModal: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  deleteQuestion(){
    const id = this.props.id;
    console.log(id);
    this.props.mutate({
      variables: { id: id },
      refetchQueries: [{ query: currentUser }]
    }).then(this.handleCloseModal())
  }

  renderInfo(){
    if(this.props.data.loading){
      return(<div>Loading...</div>)
    }
    else{
      let question = this.props.data.question;
      let rating = 0;
      if (question.votes == 0){
        rating = "unrated";
      } else {
        rating = (question.upVotes / question.votes) * 5;
        rating = rating.toFixed(2);
      }

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
        <CollapsibleItem header={question.prompt.substring(0,80) + "..."} icon='arrow_drop_down'>
          <div className="collection">
            <div className="collection-item"><Icon className="collection-icon icon-blue">live_help</Icon>{question.prompt}</div>
            <div className="collection-item"><code className="code">{question.code}</code></div>
            <div className="collection-item"><Icon className="collection-icon">check_circle</Icon>{question.correct}</div>
            <div className="collection-item"><Icon className="collection-icon">block</Icon>{question.answer2}</div>
            <div className="collection-item"><Icon className="collection-icon">block</Icon>{question.answer3}</div>
            <div className="collection-item"><Icon className="collection-icon">block</Icon>{question.answer4}</div>
            <div className="collection-item"><Icon className="collection-icon">block</Icon>{question.answer5}</div>
            <div className="collection-item"><Icon className="collection-icon">lightbulb_outline</Icon><ReactMarkdown source={question.explanation} /></div>
            <div className="collection-item"><Icon className="collection-icon">list</Icon>{question.topics.map((topic)=>{return <span className="topic-list" key={topic}>{topic}</span>})}</div>
            <div className="collection-item"><Icon className="collection-icon">thumbs_up_down</Icon>Rating: {rating}/5.0</div>
          </div>
          <div>
            <div className="btn btn-special">Edit</div>
            <div className="btn btn-danger right" onClick={this.handleOpenModal}>Delete</div>
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
