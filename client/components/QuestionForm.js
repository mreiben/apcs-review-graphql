import React, { Component } from 'react';

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
      topics: [],
      explanation: '',
    };
  }

//DO THIS NEXT!
  onSubmit(event){
    event.preventDefault();
    const { email, password } = this.state;
    this.props.onSubmit({ email, password });
  }

  renderErrors(){
    if(this.props.errors){
      return(this.props.errors.map(error => <div key={error}>{error}</div>))
    }
    // <div className="errors">
    //   {this.props.errors.map(error => <div key={error}>{error}</div>)}
    // </div>
  }

  render(){
    return(
      <div className="row">
        <h4>Create a Question:</h4>
        <form
          className="col s8"
          onSubmit={this.onSubmit.bind(this)}
        >
          <div className="input-field">
            <label>Prompt</label>
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
            <input
              id="answer1"
              type="text"
              className="validate"
              value={this.state.answer1}
              onChange={ e => this.setState({ answer1: e.target.value, correct: e.target.value })}
            />
          </div>
          <div className="input-field">
            <label htmlFor="answer2">Incorrect Answer</label>
            <input
              id="answer2"
              type="text"
              className="validate"
              value={this.state.answer2}
              onChange={ e => this.setState({ answer2: e.target.value })}
            />
          </div>
          <div className="input-field">
            <label htmlFor="answer3">Incorrect Answer</label>
            <input
              id="answer3"
              type="text"
              className="validate"
              value={this.state.answer3}
              onChange={ e => this.setState({ answer3: e.target.value })}
            />
          </div>
          <div className="input-field">
            <label htmlFor="answer4">Incorrect Answer</label>
            <input
              id="answer4"
              type="text"
              className="validate"
              value={this.state.answer4}
              onChange={ e => this.setState({ answer4: e.target.value })}
            />
          </div>
          <div className="input-field">
            <label htmlFor="answer5">Incorrect Answer</label>
            <input
              id="answer5"
              type="text"
              className="validate"
              value={this.state.answer5}
              onChange={ e => this.setState({ answer5: e.target.value })}
            />
          </div>
          <select multiple>
            <option value="" disabled>Question topics...</option>
            <option value="arithmetic">arithmetic</option>
            <option value="boolean logic">boolean logic</option>
            <option value="nested boolean logic">nested boolean logic</option>
            <option value="memory allocation">memory allocation</option>
            <option value="arrays">arrays</option>
            <option value="ArrayLists">ArrayLists</option>
            <option value="loops">loops</option>
            <option value="nested loops">nested loops</option>
            <option value="functions">functions</option>
            <option value="string methods">string methods</option>
            <option value="classes">classes</option>
            <option value="inheritance">inheritance</option>
            <option value="interfaces">interfaces</option>
            <option value="recursive functions">recursive functions</option>
          </select>
          <div className="input-field">
            <label>Explanation</label>
            <textarea
              className="materialize-textarea"
              value={this.state.explanation}
              onChange={ e => this.setState({ explanation: e.target.value })}
            />
          </div>
          {this.renderErrors()}
          <button className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default QuestionForm;
