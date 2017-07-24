import React, { Component } from 'react';
import { Link } from 'react-router';

class NotFound extends Component {

  render(){
    return(
      <div>
        <h4>Whoops, that page doesn't exist!</h4>
        <Link to="/dashboard">Back to reality</Link>
      </div>
    );
  }
}

export default NotFound;
