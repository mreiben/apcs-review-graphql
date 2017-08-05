import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/GetQuestionById';
import { hashHistory } from 'react-router';
import ReactMarkdown from 'react-markdown';

class Question extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentAnswer: "",
      answerVisible: false
    }
  }

  componentDidMount(){
    let { answer1, answer2, answer3, answer4, answer5 } = this.props;
    let mixedAnswers = this.shuffle([answer1, answer2, answer3, answer4, answer5]);
    this.setState({mixedAnswers: mixedAnswers});
  }

  componentWillReceiveProps(nextProps){
    let { answer1, answer2, answer3, answer4, answer5 } = nextProps;
    let mixedAnswers = this.shuffle([answer1, answer2, answer3, answer4, answer5]);
    if(nextProps.answer1 != this.props.answer1){
      this.setState({mixedAnswers: mixedAnswers});
      this.setState({answerVisible: false});
    }
  }

  renderRating(upVoters, downVoters){
    let up = upVoters.length;
    let down = downVoters.length;
    let rating = ((up + 5)/(up + down + 5)*5).toFixed(1);
    return `${rating}/5.0`;
  }

  shuffle(array){
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  handleAnswerSelect(e){
    this.setState({currentAnswer: e.target.value})
    this.props.onAnswerSelect(e.target.value);
  }

  handleSubmit(){
    if(this.props.style == "feedback" && !this.state.answerVisible){
      this.setState({ answerVisible: true });
    }
    else{
      this.props.onAnswerSubmit();
    }
  }

  renderQuestionInfo(){
    if(this.state.answerVisible){
      let { style, number, prompt, code, correct, explanation, topics, upVoters, downVoters, userName } = this.props;
      return(
        <div className="question-info">
          <div className="section">
            <p><span className="resultCat">Topics: </span>{topics.map((topic)=>{return <span className="topic-box" key={topic}>{topic}</span>})}</p>
            <p><span className="resultCat">Explanation: </span></p>
            <ReactMarkdown source={explanation} />
            <p><span className="resultCat">Current Rating: </span>{this.renderRating(upVoters, downVoters)}</p>
            <p><span className="resultCat">Created by: </span>{userName}</p>
          </div>
        </div>
      );
    }
  }

  renderAnswerChoice(i){
    let id = `answer${i}`;
    let classes = "";
    let disabled = false;
    if(this.state.answerVisible && this.props.correct == this.state.mixedAnswers[i]){
      classes = "correctAnswer";
      disabled = true;
    }
    else if(this.state.answerVisible){
      classes = "incorrectAnswer";
      disabled = true;
    }
    return(
      <div className="collection-item">
        <div className={classes}>
          <input checked={this.state.currentAnswer === this.state.mixedAnswers[i]}
            name="answerGroup"
            disabled={disabled}
            type="radio"
            id={id}
            value={this.state.mixedAnswers[i]}
            onClick={this.handleAnswerSelect.bind(this)}
          />
          <label style={{height: 'inherit'}} htmlFor={id}><ReactMarkdown source={this.state.mixedAnswers[i]}/></label>
        </div>
      </div>
    );
  }


  renderSubmitButton(){
    let btnState = this.state.answerVisible ? "Next Question" : "Submit Answer";
    return (
      <div
        type="submit"
        className="btn btn-special"
        onClick={() => { this.handleSubmit() }}
        >
          {btnState}
        </div>
      )
    }

    render(){
      let { style, number, prompt, code, correct, explanation, topics, upVoters, downVoters, userName } = this.props;
      if(!this.state.mixedAnswers){ return <div>loading...</div>}
      else{
        return(
          <div>
            <div>
              <h5>Question {number}</h5>
              <ReactMarkdown source={prompt} />
              <code className="code">{code}</code>
              <div className="collection">
                {this.renderAnswerChoice(0)}
                {this.renderAnswerChoice(1)}
                {this.renderAnswerChoice(2)}
                {this.renderAnswerChoice(3)}
                {this.renderAnswerChoice(4)}
              </div>
              <div className="section">
                {this.renderSubmitButton() }
              </div>
              {this.renderQuestionInfo()}
            </div>
          </div>
        )
      }
    }
  }
  export default Question;
