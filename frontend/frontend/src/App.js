import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
class  App extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
      email: " ",
      Password: " "
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }
  handleEmail(e) {
   this.setState({email: e.target.value});
  }
  handlePassword(e) {
   this.setState({Password: e.target.value});
  }
  handleClickSignIn(){
    
  }
  render(){
  return (
    <div>
      <h1>Professional Νetworking</h1>
      <div class="topnav">
        <div class="right">
          <Link to="/Register">Sign up</Link>
        </div>
        <div class="container">
        <form>
          <label>Email Address</label>
          <input type="text"  id="Email" name="Email" defaultValue={this.state.email}  onChange={this.handleEmail} size="60"/><br/>
          <label>Password</label>
          <input type="text" type="text"  id="Password" name="Password" defaultValue={this.state.Password}  onChange={this.handlePassword} size="60"/><br/><br/>
          <button onClick={this.handleClickSignIn}>
          Sign In
          </button>
        </form>
        </div>
      </div>
    </div>
  );
  }
}

export default App;
