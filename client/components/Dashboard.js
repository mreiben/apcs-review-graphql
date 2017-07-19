import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/GetQuestions';
import QuestionView from './QuestionView';
import { Link } from 'react-router';

//wrapped by requireAuth in index.js routes

class Dashboard extends Component {

  render(){
    return(
      <div>
        <Link to="/create" className="btn">Create Question</Link>
        <Link to="/questions" className="btn">Practice!</Link>
        <QuestionView></QuestionView>
      </div>
    );
  }
}

export default graphql(query)(Dashboard);
