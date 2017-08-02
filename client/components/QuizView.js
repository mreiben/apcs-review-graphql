import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import mutation from '../mutations/CreateQuizResult';
import currentUser from '../queries/CurrentUser';
import { Link, hashHistory } from 'react-router';
import { Preloader, Input } from 'react-materialize';
import ReactMarkdown from 'react-markdown';
import Question from './Question.js';
import _ from 'lodash';

class QuizView extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentQuestionIndex: 0,
      currentAnswer: "",
      userAnswers: [],
      correctAnswers: [],
      questions: []
    };
  }

  componentDidMount(){
    let questions = this.props.questions;
    let qPositions = this.shuffle(_.range(0, questions.length));
    let mixedQuestions = qPositions.map((i) =>{
      return questions[i];
    });
    this.setState({questions: mixedQuestions.slice(0, this.props.number)});
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

  renderTypesList(){
    let topics = this.props.topics.split(",").join(", ");
    if(topics.length < 50){
      return topics
    }
    else {
      return topics.substring(0,50) + "...";
    }
  }

  renderNumber(){
    let n = this.props.questions.length;
    let number = this.props.number;
    if(number == 1){
      return "1 Question";
    }
    else if(number > n){
      return `${n} Questions`;
    }
    else {
      return `${number} Questions`;
    }
  }

  renderNumberWarning(){
    let n = this.props.questions.length;
    if(n == 0){
      return <div className="warning">
        <i className="material-icons">error_outline</i>
        <div className="">
          Uh-oh! No questions matched your request. Removing Strict Mode and expanding your topics list may fix this problem.
          Consider writing your own question for these topics!
        </div>
      </div>
    }
    else if (this.props.number > n){
      return <div className="warning">
        <i className="material-icons">error_outline</i>
        <div className="">
          Uh-oh! We couldn't find enough questions to fill your quiz.
          For now, you can practice with {n} questions. Please write more so that
          other students can get more practice with these topics!
        </div>
      </div>
    }
  }

  renderStrict(){
    let strict = this.props.strict;
    if(strict == "true"){
      return "Strict Mode: On";
    }
    else {
      return "Strict Mode: Off"
    }
  }

  renderQuestion(){
    if(this.state.questions.length == 0){
      return <Preloader size='big' />
    }
    else{
      let question = this.state.questions[this.state.currentQuestionIndex];
      let { prompt, code, answer1, answer2, answer3, answer4, answer5, correct, explanation, topics, votes, upVotes, userName } = question;
      let style = this.props.style;
      let number = this.state.currentQuestionIndex + 1;
      return(
        <Question
          prompt={prompt}
          code={code}
          answer1={answer1}
          answer2={answer2}
          answer3={answer3}
          answer4={answer4}
          answer5={answer5}
          correct={correct}
          explanation={explanation}
          topics={topics}
          number={number}
          style={style}
          votes={votes}
          upVotes={upVotes}
          userName={userName}
          onAnswerSelect={this.onAnswerSelect.bind(this)}
          onAnswerSubmit={this.onAnswerSubmit.bind(this)}
        />
      )
    }
  }

  onAnswerSelect(answer){
    this.setState({ currentAnswer: answer});
  }

  onAnswerSubmit(){
    let i = this.state.currentQuestionIndex;
    let { userAnswers, correctAnswers } = this.state;
    userAnswers.push(this.state.currentAnswer);
    correctAnswers.push(this.state.questions[i].correct);
    if(this.state.currentQuestionIndex == this.props.number -1){
      this.setState({
        userAnswers: userAnswers,
        correctAnswers: correctAnswers,
        currentAnswer: ""
      });
      //run mutation to create quiz result and attach it to user
      let prompts = this.state.questions.map((q) => { return q.prompt });
      let questionTopics = this.state.questions.map((q) => { return q.topics });
      let codes = this.state.questions.map((q) => { return q.code });
      let questionIds = this.state.questions.map((q) => { return q.id });
      let { userAnswers, correctAnswers } = this.state;
      let userId = this.props.data.user.id;
      let correct = 0;
      for(let i = 0; i < this.state.userAnswers.length; i++){
        if(userAnswers[i] == correctAnswers[i]){ correct++; }
      }

      this.props.mutate({
        variables: { prompts, codes, questionIds, correctAnswers, userAnswers, questionTopics, correct, userId },
        refetchQueries: [{ query: currentUser }]
      }) //reroute to user quiz results view
      .then(() => hashHistory.push('/dashboard'));
    }
    else{
      this.setState({
        currentQuestionIndex: i + 1,
        userAnswers: userAnswers,
        correctAnswers: correctAnswers,
        currentAnswer: ""
      });
    }

  }

  render(){
    if(!this.props.questions){
      return <Preloader size='big' />
    }
    else{
      return(
        <div>
          <div className="section">
            <div id="quiz-info-bar" className="quiz-header z-depth-2">
              <Link to="/dashboard" className="btn dashboard-btn  btn-special quiz-header z-depth-0">Back</Link>
              <div>{this.renderNumber()}</div>
              <div>Topics: {this.renderTypesList()}</div>
              <div>{this.renderStrict()}</div>
            </div>
            {this.renderNumberWarning()}
            {this.renderQuestion()}
          </div>
        </div>
      );
    }
  }
}

export default graphql(currentUser)(
  graphql(mutation)(QuizView)
);
