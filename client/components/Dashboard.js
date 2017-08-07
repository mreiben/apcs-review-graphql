import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import getQuestions from '../queries/GetQuestions';
import getQuizzes from '../queries/GetQuizzes';
import { Link } from 'react-router';
import Countdown from 'react-countdown-now';
import FontAwesome from 'react-fontawesome';

//wrapped by requireAuth in index.js routes

class Dashboard extends Component {

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
            <div className="collection">
              <h5 className="collection-item">App facts</h5>
              <p className="collection-item">Available Questions: {questions.length}</p>
              <p className="collection-item">Quizzes Taken: {quizzes.length}</p>
            </div>
          </div>
          <div className="footer">
            <p>Copyright © 2017 Jason Eiben <a href="https://github.com/mreiben/apcs-review-graphql"><FontAwesome name='github' /></a></p>
            {/* <p className="trademark">AP® is a trademark owned by the College Board, which is not affiliated with, and does not endorse, this site.</p> */}
          </div>
        </div>
      );
    }
  }
}
//
// export default graphql(getQuizzes)(
//   graphql(getQuestions)(Dashboard)
// );

export default compose(
  graphql(getQuizzes, {name: "Quizzes"}),
  graphql(getQuestions, {name: "Questions"})
)(Dashboard);
