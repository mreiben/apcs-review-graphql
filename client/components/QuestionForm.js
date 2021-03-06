import React, { Component } from 'react';
import mutation from '../mutations/CreateQuestion';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
import Select from 'react-select';
import getQuestions from '../queries/GetQuestions';
import currentUser from '../queries/CurrentUser';
import { Link } from 'react-router';

class QuestionForm extends Component {
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
    const { prompt, code, answer1, answer2, answer3, answer4, answer5, correct, explanation } = this.state;
    let topics = this.state.topics.sort();
    const inputValues = { "prompt": prompt, "answer 1": answer1, "answer 2": answer2, "answer 3": answer3, "answer 4": answer4, "answer 5": answer5, "correct answer": correct, "explanation": explanation, "topic": topics }
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
        variables: { prompt, code, answer1, answer2, answer3, answer4, answer5, correct, topics, explanation },
        refetchQueries: [{ query: getQuestions }, { query: currentUser }]
      })
      .then(() => hashHistory.push('/dashboard'));
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

    return(
      <div>
        <div className="section">
          <Link to="/dashboard" className="btn dashboard-btn btn-special">Back</Link>
        </div>
        <h4 className="view-top">Create a Question:</h4>
        <form
          className="col s12"
          onSubmit={this.onSubmit.bind(this)}
        >
          <div className="input-field">
            <label>Prompt - (markdown compatible)</label>
            <textarea
              className="materialize-textarea"
              value={this.state.prompt}
              onChange={ e => this.setState({ prompt: e.target.value })}
            />
          </div>
          <div className="input-field">
            <label>Code snippet (optional)</label>
            <textarea
              className="materialize-textarea"
              value={this.state.code}
              onChange={ e => this.setState({ code: e.target.value })}
            />
          </div>
          <p>Please provide one correct and four incorrect answer choices:</p>
          <div className="input-field">
            <label htmlFor="answer1">Correct Answer</label>
            <textarea
              id="answer1"
              type="text"
              className="materialize-textarea"
              value={this.state.answer1}
              onChange={ e => this.setState({ answer1: e.target.value, correct: e.target.value })}
            />
          </div>
          <div className="input-field">
            <label htmlFor="answer2">Incorrect Answer</label>
            <textarea
              id="answer2"
              type="text"
              className="materialize-textarea"
              value={this.state.answer2}
              onChange={ e => this.setState({ answer2: e.target.value })}
            />
          </div>
          <div className="input-field">
            <label htmlFor="answer3">Incorrect Answer</label>
            <textarea
              id="answer3"
              type="text"
              className="materialize-textarea"
              value={this.state.answer3}
              onChange={ e => this.setState({ answer3: e.target.value })}
            />
          </div>
          <div className="input-field">
            <label htmlFor="answer4">Incorrect Answer</label>
            <textarea
              id="answer4"
              type="text"
              className="materialize-textarea"
              value={this.state.answer4}
              onChange={ e => this.setState({ answer4: e.target.value })}
            />
          </div>
          <div className="input-field">
            <label htmlFor="answer5">Incorrect Answer</label>
            <textarea
              id="answer5"
              type="text"
              className="materialize-textarea"
              value={this.state.answer5}
              onChange={ e => this.setState({ answer5: e.target.value })}
            />
          </div>
          <Select
            placeholder="Topics for this question..."
            name="topics-select"
            multi={true}
            value={this.state.topics}
            options={questionTopics}
            onChange={this.updateTopics.bind(this)}
          />
          <div className="input-field">
            <label>Explanation - (markdown compatible)</label>
            <textarea
              className="materialize-textarea"
              value={this.state.explanation}
              onChange={ e => this.setState({ explanation: e.target.value })}
            />
          </div>
          {this.renderErrors()}
          <button className="btn btn-special">Submit</button>
        </form>
      </div>
    );
  }
}

// export default graphql(currentUser)(
export default graphql(getQuestions)(
    graphql(mutation)(QuestionForm)
  );
// );
