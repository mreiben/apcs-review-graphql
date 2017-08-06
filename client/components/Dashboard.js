import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import { Link } from 'react-router';
import Countdown from 'react-countdown-now';

//wrapped by requireAuth in index.js routes

class Dashboard extends Component {

  render(){
    const { loading, user } = this.props.data;
    if(loading){ return <div />; }

    if(!user){
      return(
        <p>Sign up or sign in to get started!</p>
      );
    }
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
          <h4>The AP® Computer Science A Exam:</h4>
          <h5>Tuesday, May 15th 2018</h5>
          <h5>Countdown:
            <Countdown
              date={'Tues, May 15 2018 12:00'}
              renderer={renderer}
            />
          </h5>
          <div className="section">
            <div className="collection">
              <h5 className="collection-item">App facts</h5>
              <p className="collection-item">some stats here</p>
              </div>
            </div>
            <div className="footer">
              <p>Copyright © 2017 Jason Eiben</p>
              {/* <p className="trademark">AP® is a trademark owned by the College Board, which is not affiliated with, and does not endorse, this site.</p> */}
            </div>
          </div>
        );
      }
    }
  }

  export default graphql(query)(Dashboard);
