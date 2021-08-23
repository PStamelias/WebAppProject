import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';
const url = "http://127.0.0.1:8000/api/app";
class  App extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
      email: " ",
      Password: " ",
      con: " ",
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
    axios.post(url,{
      email: this.state.email,
      Password: this.state.Password,
      }).then(response => {
      response.json().then(data => {
        if(data.result === 'User'){
          this.setState({con: 'User'});
        }
        if(data.result === 'Admin'){
          this.setState({con: 'Admin'});
        }
        console.log(data.result);
      })
    })
    .catch(function (error) {
      this.setState({con: 'UnknownUser'});
      console.log(error);
    });
  }
  render(){
  return (
    <div>
      <h1>Welcome to Professional Νetworking</h1>
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
