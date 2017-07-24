import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import { Row, Input, Form } from 'react-materialize';

class QuizSetup extends Component {
  constructor(props){
    super(props);
    this.state = {
      topics: [],
      questions: 0,
      errors: ""
    };
  }

  renderCheckBoxes(topics){
    return topics.map((topic)=>{
      return <div key={topic.value} className="quiz-topic">
        <Input
          name='topics'
          type='checkbox'
          value={topic.value}
          label={topic.value}
          className="quiz-topic"
          onClick={this.onTopicClick.bind(this)}
        />
      </div>
    });
  }

  onTopicClick(e){
    const topics = this.state.topics;
    let index;
    this.setState({errors: ""});

    if (e.target.checked) {
      topics.push(e.target.value);
    } else {
      index = topics.indexOf(e.target.value);
      topics.splice(index, 1);
    }
    this.setState({ topics: topics });
  }

  onNumberChange(e){
    console.log(e.target.value)
    this.state.questions = e.target.value;
    this.setState({errors: ""});
  }

  startQuiz(){
    if(this.state.topics == [] || this.state.questions == 0 ){
      this.setState({errors: "Please select at least one topic and choose a number of questions!"});
    }
    else{
      console.log(`starting quiz with ${this.state.questions} questions about topics: ${this.state.topics} `);
    }
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
          <Link to="/dashboard" className="btn dashboard-btn  btn-special">Back</Link>
        </div>
        <div>
          <h4>Ready to practice?</h4>
          <p>Select the topics that you want to focus on and a number of questions below:</p>
          <Row>
            {this.renderCheckBoxes(questionTopics).slice(0,4)}
          </Row>
          <Row>
            {this.renderCheckBoxes(questionTopics).slice(4,8)}
          </Row>
          <Row>
            {this.renderCheckBoxes(questionTopics).slice(8,12)}
          </Row>
          <Row>
            {this.renderCheckBoxes(questionTopics).slice(12,16)}
          </Row>
          <Row>
            <Input
              s={4}
              type="number"
              min={1}
              label="How many questions?"
              validate
              onChange={this.onNumberChange.bind(this)}
            />
          </Row>
          <div
            className="btn dashboard-btn btn-special"
            onClick={this.startQuiz.bind(this)}
          >Start quiz!</div>
        </div>
        <p className="errors">{this.state.errors}</p>
      </div>
    );
  }
}

export default QuizSetup;
