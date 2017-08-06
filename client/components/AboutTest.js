import React from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

const AboutTest = () => {
  return(
    <div>
      <div className="section">
        <Link to="/dashboard" className="btn dashboard-btn  btn-special">Dashboard</Link>
        <Link to="/create" className="btn dashboard-btn  btn-special">Create Question</Link>
        <Link to="/practice" className="btn dashboard-btn  btn-special">Practice</Link>
        <Link to="/profile" className="btn dashboard-btn  btn-special">Profile</Link>
        <Link to="/about-test" className="btn dashboard-btn  btn-special-light">Test Info</Link>
      </div>
      <h4>Want to learn more about the test?</h4>
      <div className="section">
        <div className="collection">
          <h5 className="collection-item">General Test Information</h5>
          <p className="collection-item">The The AP® Computer Science A Exam tests your understanding of
            object-oriented programming and your mastery of the Java programming
            language.  The test is three hours long, split evenly between multiple choice
            questions and free response questions.  Visit the <a href="https://apstudent.collegeboard.org/apcourse/ap-computer-science-a">Course Overview</a> from the
            College Board to see a more comprehensive description of the course and exam.</p>
        </div>
        <div className="collection">
          <h5 className="collection-item">Exam Topics</h5>
          <div className="collection-item">
            <p>While the course covers a wide array of topics related to software engineering, the written exam primarily focuses on the following topics:</p>
            <ul className="topics-list">
              <li>The AP Java subset</li>
              <li>Testing</li>
              <li>Debugging</li>
              <li>Runtime exceptions</li>
              <li>Program correctness</li>
              <li>Algorithm Analysis</li>
              <li>Numerical representations of integers</li>
              <li>Primitive data types (int, boolean, double)</li>
              <li>Strings</li>
              <li>Classes</li>
              <li>Lists</li>
              <li>Arrays (1-dimensional and 2-dimensional)</li>
              <li>Control Flow</li>
              <li>Operations on data structures</li>
              <li>Searching</li>
              <li>Sorting</li>
              <br/>
            </ul>
          </div>
        </div>
        <div className="collection">
          <h5 className="collection-item">Written Response Resources</h5>
          <p className="collection-item">stuff here</p>
        </div>
      </div>
    </div>
  )
}

export default AboutTest;
