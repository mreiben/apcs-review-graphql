import React, { Component } from 'react';
import mutation from '../mutations/EditQuestion';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import Select from 'react-select';
import getQuestions from '../queries/GetQuestions';
import getQuestionById from '../queries/GetQuestionById';
import currentUser from '../queries/CurrentUser';
import { Link } from 'react-router';

class QuestionEditForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      prompt: '',
      code: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: '',
      correct: '',
      topics: [],
      explanation: '',
      errors: []
    };
  }

  onSubmit(event){
    event.preventDefault();
    const { prompt, code, answer1, answer2, answer3, answer4, answer5, correct, topics, explanation } = this.state;
    const id = this.props.data.question.id;
    const inputValues = { "prompt": prompt, "answer 1": answer1, "answer 2": answer2, "answer 3": answer3, "answer 4": answer4, "answer 5": answer5, "correct answer": correct, "explanation": explanation }
    let newErrors = [];
    for(var prop in inputValues){
      if(inputValues[prop]  == ''){
        newErrors.push(`Question must have a(n) ${prop}`);
      }
    }
    if(newErrors.length > 0){
      this.setState({errors: newErrors});
    }
    else{
      this.props.mutate({
        variables: { id, prompt, code, answer1, answer2, answer3, answer4, answer5, correct, topics, explanation },
        refetchQueries: [{ query: getQuestions }, { query: currentUser }]
      })
      .then(() => hashHistory.push('/profile'));
    }
  }

  renderErrors(){
    if(this.state.errors){
      return(this.state.errors.map(error => <div className="errors" key={error}>{error}</div>))
    }
  }

  updateTopics(e){
    const currentTopics = e.map((topic) => {
      return topic.value;
    });
    this.setState({topics: currentTopics });
  }

  render(){
    var questionTopics = [
      { value: 'arithmetic', label: 'arithmetic' },
      { value: 'data types', label: 'data types' },
      { value: 'boolean logic', label: 'boolean logic' },
      { value: 'nested boolean logic', label: 'nested boolean logic' },
      { value: 'memory allocation', label: 'memory allocation' },
      { value: 'arrays', label: 'arrays' },
      { value: '2D arrays', label: '2D arrays' },
      { value: 'ArrayLists', label: 'ArrayLists' },
      { value: 'loops', label: 'loops' },
      { value: 'nested loops', label: 'nested loops' },
      { value: 'functions', label: 'functions' },
      { value: 'string methods', label: 'string methods' },
      { value: 'classes', label: 'classes' },
      { value: 'inheritance', label: 'inheritance' },
      { value: 'interfaces', label: 'interfaces' },
      { value: 'recursive functions', label: 'recursive functions' },
    ];
    if(this.props.data.loading){
      return (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      )
    }
    return(
      <div>
        <div className="section">
          <Link to="/dashboard" className="btn dashboard-btn btn-special">Back</Link>
        </div>
        <h4 className="view-top">Edit your question:</h4>
        <form
          className="col s12"
          onSubmit={this.onSubmit.bind(this)}
        >
          <label>Old Prompt: {this.props.data.question.prompt}</label>
          <div className="input-field">
            <textarea
              placeholder={this.props.data.question.prompt}
              className="materialize-textarea"
              value={this.state.prompt}
              onChange={ e => this.setState({ prompt: e.target.value })}
            />
          </div>
          <label>Old code snippet: {this.props.data.question.code}</label>
          <div className="input-field">
            <textarea
              placeholder={this.props.data.question.code}
              className="materialize-textarea"
              value={this.state.code}
              onChange={ e => this.setState({ code: e.target.value })}
            />
          </div>
          <p>Please provide one correct and four incorrect answer choices:</p>
          <label htmlFor="answer1">Old correct answer: {this.props.data.question.correct}</label>
          <div className="input-field">
            <input
              placeholder={this.props.data.question.correct}
              id="answer1"
              type="text"
              className="validate"
              value={this.state.answer1}
              onChange={ e => this.setState({ answer1: e.target.value, correct: e.target.value })}
            />
          </div>
          <label htmlFor="answer2">Old incorrect answer 1: {this.props.data.question.answer2}</label>
          <div className="input-field">
            <input
              placeholder={this.props.data.question.answer2}
              id="answer2"
              type="text"
              className="validate"
              value={this.state.answer2}
              onChange={ e => this.setState({ answer2: e.target.value })}
            />
          </div>
          <label htmlFor="answer3">Old incorrect answer 2: {this.props.data.question.answer3}</label>
          <div className="input-field">
            <input
              placeholder={this.props.data.question.answer3}
              id="answer3"
              type="text"
              className="validate"
              value={this.state.answer3}
              onChange={ e => this.setState({ answer3: e.target.value })}
            />
          </div>
          <label htmlFor="answer4">Old incorrect answer 3: {this.props.data.question.answer4}</label>
          <div className="input-field">
            <input
              placeholder={this.props.data.question.answer4}
              id="answer4"
              type="text"
              className="validate"
              value={this.state.answer4}
              onChange={ e => this.setState({ answer4: e.target.value })}
            />
          </div>
          <label htmlFor="answer5">Old incorrect answer 4: {this.props.data.question.answer5}</label>
          <div className="input-field">
            <input
              placeholder={this.props.data.question.answer5}
              id="answer5"
              type="text"
              className="validate"
              value={this.state.answer5}
              onChange={ e => this.setState({ answer5: e.target.value })}
            />
          </div>

          <Select
            placeholder={"Old topics: " + this.props.data.question.topics.join(" ")}
            name="topics-select"
            multi={true}
            value={this.state.topics}
            options={questionTopics}
            allowCreate={true}
            onChange={this.updateTopics.bind(this)}
          />
          <label>Old explanation: {this.props.data.question.explanation}</label>
          <div className="input-field">
            <textarea
              placeholder={this.props.data.question.explanation}
              className="materialize-textarea"
              value={this.state.explanation}
              onChange={ e => this.setState({ explanation: e.target.value })}
            />
          </div>
          {this.renderErrors()}
          <button className="btn btn-special">Edit Question</button>
        </form>
      </div>
      )
    }
  }

export default graphql(currentUser)(
  graphql(mutation)(
    graphql(getQuestionById, {
      options: (ownProps) => ({ variables: { id: ownProps.params.id }})
    })(QuestionEditForm)
  )
);
