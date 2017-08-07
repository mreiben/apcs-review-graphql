import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import getQuestions from '../queries/GetQuestions';
import getQuizzes from '../queries/GetQuizzes';
import { Link } from 'react-router';
import Countdown from 'react-countdown-now';
import FontAwesome from 'react-fontawesome';
import { PieChart, Pie, Legend, Tooltip, Cell } from 'recharts';

//wrapped by requireAuth in index.js routes

class Dashboard extends Component {

  renderQuestionStats(questions){
    let topics = {
      "arithmetic": 0,
      "data types": 0,
      "boolean logic": 0,
      "nested boolean logic": 0,
      "memory allocation": 0,
      "arrays": 0,
      "2D arrays": 0,
      "ArrayLists": 0,
      "loops": 0,
      "nested loops": 0,
      "functions": 0,
      "string methods": 0,
      "classes": 0,
      "inheritance": 0,
      "interfaces": 0,
      "recursive functions": 0,
    };

    //count questions by topic
    questions.forEach((question) => {
      question.topics.forEach((topic) => {
        topics[topic] = topics[topic] + 1;
      })
    });
    let topicsArr = [];
    Object.keys(topics).forEach((entry) => {
      topicsArr.push({topic: entry, value: topics[entry]});
    });
    return topicsArr;
  }

  render(){
    const { loading } = this.props.data;
    const quizzes = this.props.Quizzes.quizzes;
    const questions = this.props.Questions.questions;

    if(loading || !quizzes || !questions){ return <div />; }

    else {

      const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
          return <span>The 2019 test date has not been announced yet...</span>;
        } else {
          return (
            <span> {days} days, {hours} hours, {minutes} minutes and {seconds} seconds!</span>
          );
        }
      };

      const COLORS = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];

      let countedTopics = this.renderQuestionStats(questions);

      return(
        <div>
          <div className="section nav-holder">
            <Link to="/dashboard" className="btn dashboard-btn  btn-special-light">Dashboard</Link>
            <Link to="/create" className="btn dashboard-btn  btn-special">Create Question</Link>
            <Link to="/practice" className="btn dashboard-btn  btn-special">Practice</Link>
            <Link to="/profile" className="btn dashboard-btn  btn-special">Profile</Link>
            <Link to="/about-test" className="btn dashboard-btn  btn-special">Test Info</Link>
          </div>
          <div className="section">
            <h4>The AP® Computer Science A Exam: 5/15/2018</h4>
            <h5>Countdown:
              <Countdown
                date={'Tues, May 15 2018 12:00'}
                renderer={renderer}
              />
            </h5>
          </div>
          <div>
            <p>Welcome back! This site was designed to allow students and teachers to create, share,
              and practice on multiple choice questions for the APCS exam.  While it's easy to find
              more than a decade's worth of Free Response questions, very few multiple choice questions
              are released by the College Board. This free resource is only useful if users actually create
              evaluate, and practice with test-level questions - so please write one today!</p>
            <div className="dashboard-data-holder">
              <div className="collection">
                <h5 className="collection-item">App Stats</h5>
                <div className="collection-item">Quizzes Taken: {quizzes.length}</div>
                <div className="collection-item">
                  Available Questions: {questions.length}
                  <PieChart width={800} height={400}>
                    <Pie
                      data={countedTopics}
                      dataKey='value'
                      nameKey='topic'
                      valueKey='value'
                      cx={200}
                      cy={200}
                      innerRadius={75}
                      outerRadius={175}
                    >
                    {
                      countedTopics.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                    }
                    </Pie>
                    <Legend align='right' verticalAlign='middle' width={300} layout='vertical'/>
                    <Tooltip />
                  </PieChart>
                </div>
              </div>
            </div>
          </div>
          <div className="footer">
            <p>Copyright © 2017 Jason Eiben <a href="https://github.com/mreiben/apcs-review-graphql"><FontAwesome name='github' /></a></p>
          </div>
        </div>
      );
    }
  }
}

export default compose(
  graphql(getQuizzes, {name: "Quizzes"}),
  graphql(getQuestions, {name: "Questions"})
)(Dashboard);
