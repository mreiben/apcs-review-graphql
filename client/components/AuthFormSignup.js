import React, { Component } from 'react';

class AuthFormSignup extends Component {
  constructor(props){
    super(props);

    this.state = { email: '', password: '', name: '' };
  }

  onSubmit(event){
    event.preventDefault();
    const { email, password, name } = this.state;
    this.props.onSubmit({ email, password, name });
  }

  render(){
    return(
      <div className="row">
        <form
          className="col s6"
          onSubmit={this.onSubmit.bind(this)}
        >
          <div className="input-field">
            <input
              placeholder="Email"
              value={this.state.email}
              onChange={ e => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="input-field">
            <input
              placeholder="User Name"
              value={this.state.name}
              onChange={ e => this.setState({ name: e.target.value })}
            />
          </div>
          <div className="input-field">
            <input
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={ e => this.setState({ password: e.target.value })}
            />
          </div>
          <div className="errors">
            {this.props.errors.map(error => <div key={error}>{error}</div>)}
          </div>
          <button className="btn btn-special">Submit</button>
        </form>
      </div>
    );
  }
}

export default AuthFormSignup;
