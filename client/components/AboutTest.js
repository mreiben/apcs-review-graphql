import React from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

const AboutTest = () => {
  return(
    <div>
      <div className="section nav-holder">
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
            language.  The test is three hours long, split evenly between 40 multiple choice
            questions and 4 free response questions.  Visit the <a href="https://apstudent.collegeboard.org/apcourse/ap-computer-science-a">Course Overview</a> from the
            College Board to see a more comprehensive description of the course and exam.</p>
          </div>
          <div className="collection">
            <h5 className="collection-item">Exam Topics</h5>
            <div className="collection-item topics-list-holder">
              <p>While the course covers a wide array of topics related to software engineering, the written exam primarily focuses on the following topics:</p>
              <ul className="topics-list">
                <li>The AP Java Subset <a href="https://apcentral.collegeboard.org/courses/ap-computer-science-a/classroom-resources/ap-java-subset-language-features?course=ap-computer-science-a"><i className="material-icons redirect-icon">open_in_new</i></a></li>
                <li>Numerical representations of integers <a href="http://www.learning-about-computers.com/tutorials/binary_and_hexidecimal.shtml"><i className="material-icons redirect-icon">open_in_new</i></a></li>
                <li>Primitive data types (int, boolean, double) <a href="https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html"><i className="material-icons redirect-icon">open_in_new</i></a></li>
                <li>Assignment Operators <a href="https://docs.oracle.com/javase/tutorial/java/nutsandbolts/op1.html"><i className="material-icons redirect-icon">open_in_new</i></a></li>
                <li>Equality / Relational / Conditional Operators <a href="https://docs.oracle.com/javase/tutorial/java/nutsandbolts/op2.html"><i className="material-icons redirect-icon">open_in_new</i></a></li>
                <li>Strings <a href="https://www.tutorialspoint.com/java/java_strings.htm"><i className="material-icons redirect-icon">open_in_new</i></a></li>
                <li>Classes <a href="https://docs.oracle.com/javase/tutorial/java/javaOO/classes.html"><i className="material-icons redirect-icon">open_in_new</i></a></li>
                <li>Lists <a href="https://docs.oracle.com/javase/tutorial/collections/interfaces/list.html"><i className="material-icons redirect-icon">open_in_new</i></a></li>
                <li>Arrays (1-dimensional and 2-dimensional) <a href="https://docs.oracle.com/javase/tutorial/java/nutsandbolts/arrays.html"><i className="material-icons redirect-icon">open_in_new</i></a></li>
                <li>Conditional Logic <a href="https://docs.oracle.com/javase/tutorial/java/nutsandbolts/if.html"><i className="material-icons redirect-icon">open_in_new</i></a></li>
                <li>Loops <a href="https://docs.oracle.com/javase/tutorial/java/nutsandbolts/for.html"><i className="material-icons redirect-icon">open_in_new</i></a></li>
                <li>Searching <a href="http://www.java2novice.com/java-search-algorithms/"><i className="material-icons redirect-icon">open_in_new</i></a></li>
                <li>Sorting <a href="http://www.java2novice.com/java-sorting-algorithms/"><i className="material-icons redirect-icon">open_in_new</i></a></li>
                <li>Runtime exceptions<a href="https://stackoverflow.com/questions/1502860/what-are-the-most-commonly-used-runtime-exceptions-in-java"><i className="material-icons redirect-icon">open_in_new</i></a></li>
                <li>Program correctness<a href="http://www.cs.colostate.edu/~cs122/.Fall14/tutorials/tut_5.php"><i className="material-icons redirect-icon">open_in_new</i></a></li>
                <li>Algorithm Analysis<a href="https://rob-bell.net/2009/06/a-beginners-guide-to-big-o-notation/"><i className="material-icons redirect-icon">open_in_new</i></a></li>
              </ul>
              <p>Consider searching <a href="https://stackoverflow.com/questions/tagged/java">StackOverflow</a> for further examples and explanations.</p>
            </div>
          </div>
          <div className="collection">
            <h5 className="collection-item">Written Response Resources</h5>
            <div className="collection-item topics-list-holder">
              <p>The resources below are a great place to start practicing for the Free Response portion of the exam:</p>
              <ul className="fr-resources">
                <li><a href="https://apstudent.collegeboard.org/apcourse/ap-computer-science-a/exam-practice">Questions and scoring guidelines</a> from actual exams</li>
                <li><a href="https://www.tutorialspoint.com/compile_java_online.php">CodingGround</a> - an online Java runtime environment</li>
                <li><a href="http://codingbat.com/java">CodingBat</a> - interactive coding challenges</li>
                <li><a href="https://codewars.com">codewars</a> - competetive programming challenges</li>
              </ul>
            </div>
          </div>
          <p className="trademark">AP® is a trademark owned by the College Board, which is not affiliated with, and does not endorse, this site.</p>
        </div>
      </div>
    )
  }

  export default AboutTest;
