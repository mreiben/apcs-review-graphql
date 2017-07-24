import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import { Row, Input } from 'react-materialize';

class QuizSetup extends Component {
  constructor(props){
    super(props);
    this.state = { topics: [] };
  }

  renderCheckBoxes(topics){
    return topics.map((topic)=>{
      return <Input key={topic.value} name='topics' type='checkbox' value={topic.value} label={topic.value} />
    });
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
        </div>
      </div>
    );
  }
}

export default QuizSetup;
