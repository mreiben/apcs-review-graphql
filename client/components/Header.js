import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import { Link } from 'react-router';
import mutation from '../mutations/Logout';

class Header extends Component {
  onLogoutClick(){
    //mutate added to props at bottom of file
    this.props.mutate({
      refetchQueries: [{query}]
    });
  }

  renderButtons(){
    const { loading, user } = this.props.data;
    if(loading){ return <div />; }

    if(user){ return( <li><a onClick={this.onLogoutClick.bind(this)}>Logout</a></li>);}
    else {
      return(
        <div>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/login">Login</Link></li>
        </div>
      );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper #1e88e5 blue darken-1">
          <Link to="/dashboard" className="brand-logo center">APCS Multiple Choice Review</Link>
          <ul className="right">
            {this.renderButtons()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default graphql(mutation)(
  graphql(query)(Header)
);
