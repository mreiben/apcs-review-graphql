import React from 'react';
import Header from './Header';

const App = (props) => {
  return (
    <div className="container">
      <Header />
      {props.children}
      <div className="footer">
        <p>Copyright © 2017 Jason Eiben</p>
        {/* <p className="trademark">AP® is a trademark owned by the College Board, which is not affiliated with, and does not endorse, this site.</p> */}
      </div>
    </div>
  );
}

export default App;
