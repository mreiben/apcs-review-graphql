import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/GetQuestions';
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
    }
  }

  renderRating(votes, upVotes){
    if(votes == 0){
      return "unrated";
    }
    else {
      return (5 * (upvotes / votes)).toFixed(2);
    }
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
    if(this.props.style == "feedback"){
      this.setState({ answerVisible: true });
    }
    else{
      this.props.onAnswerSubmit();
      this.setState({ answerVisible: false});
    }
  }

  renderQuestionInfo(){
    if(this.state.answerVisible){
      let { style, number, prompt, code, correct, explanation, topics, votes, upVotes, userName } = this.props;
      return(
        <div className="question-info">
          <div className="section btn"
            onClick={() => { this.props.onAnswerSubmit() }}
            >
              Next Question
            </div>
          <p>Topics: {topics.map((topic)=>{return <span className="topic-box" key={topic}>{topic}</span>})}</p>
          <p>Explanation: </p>
          <ReactMarkdown source={explanation} />
          <p>rating: {this.renderRating(votes, upVotes)}</p>
          <p>Created by: {userName}</p>
        </div>
      );
    }
  }

  render(){
    let { style, number, prompt, code, correct, explanation, topics, votes, upVotes, userName } = this.props;
    if(!this.state.mixedAnswers){ return <div>loading...</div>}
    else{
      return(
        <div>
          <div>
            <h5>Question {number}</h5>
            <ReactMarkdown source={prompt} />
            <code className="code">{code}</code>
            <div className="collection">
              <div className="collection-item">
                <input checked={this.state.currentAnswer === this.state.mixedAnswers[0]} name="answerGroup" type="radio" id="answer0" value={this.state.mixedAnswers[0]} onClick={this.handleAnswerSelect.bind(this)} />
                <label htmlFor="answer0"><ReactMarkdown source={this.state.mixedAnswers[0]}/></label>
              </div>
              <div className="collection-item">
                <input checked={this.state.currentAnswer === this.state.mixedAnswers[1]} name="answerGroup" type="radio" id="answer1" value={this.state.mixedAnswers[1]} onClick={this.handleAnswerSelect.bind(this)} />
                <label htmlFor="answer1"><ReactMarkdown source={this.state.mixedAnswers[1]}/></label>
              </div>
              <div className="collection-item">
                <input checked={this.state.currentAnswer === this.state.mixedAnswers[2]} name="answerGroup" type="radio" id="answer2" value={this.state.mixedAnswers[2]} onClick={this.handleAnswerSelect.bind(this)} />
                <label htmlFor="answer2"><ReactMarkdown source={this.state.mixedAnswers[2]}/></label>
              </div>
              <div className="collection-item">
                <input checked={this.state.currentAnswer === this.state.mixedAnswers[3]} name="answerGroup" type="radio" id="answer3" value={this.state.mixedAnswers[3]} onClick={this.handleAnswerSelect.bind(this)} />
                <label htmlFor="answer3"><ReactMarkdown source={this.state.mixedAnswers[3]}/></label>
              </div>
              <div className="collection-item">
                <input checked={this.state.currentAnswer === this.state.mixedAnswers[4]} name="answerGroup" type="radio" id="answer4" value={this.state.mixedAnswers[4]} onClick={this.handleAnswerSelect.bind(this)} />
                <label htmlFor="answer4"><ReactMarkdown source={this.state.mixedAnswers[4]}/></label>
              </div>
            </div>
            <div className="section">
              <div
                type="submit"
                className="btn btn-special"
                onClick={() => { this.handleSubmit() }}
                >
                  Submit Answer
                </div>
              </div>
              {this.renderQuestionInfo()}
            </div>
          </div>
      )
    }
  }
}
export default Question;
