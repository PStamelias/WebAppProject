import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';
class  App extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
      email: "",
      Password: "",
      con:true,
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
  checkTypes(){
    if(this.state.email !== null && this.state.email !== '') {
      this.state.con=true;
    }
    else{
      alert('Empty email')
      this.state.con=false;
    }
    if(this.state.Password !== null && this.state.Password !== '') {
      this.state.con=true;
    }
    else{
      alert('Empty Password')
      this.state.con=false;
    }
  }
  handle = event => {
    event.preventDefault()
    this.checkTypes()
    if(this.state.con==true){
      this.handleClickSignIn()
    }
  }
  handleClickSignIn = () => {
    const formData = new FormData();
    formData.append('email',this.state.email);
    formData.append('Password',this.state.Password);
    axios.post('http://127.0.0.1:8000/users/app/', formData, {headers: {'Content-Type': 'application/json'}})
    .then(response => {
      if(response.data === 'Admin'){
        this.props.history.push({
          pathname: '/Admin',
          state :{
          Email : this.state.email,
          page : "Main_Page",
          isLogin: true
          }
       })
      }
      else{
        alert(response.data)
        this.props.history.push({
          pathname: '/UserPage/${response.data}',
          state :{
          Email : this.state.email,
          page : "Main_Page",
          isLogin: true
          }
       })
      }
    }).catch(error => {
      alert('Error:Email Address or Password are invalid');
    }).finally(() => { //Redirecting to the home page.
    })
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
        <form onSubmit={this.handle}>
          <label>Email Address</label>
          <input type="text"  id="Email" name="Email" defaultValue={this.state.email}  onChange={this.handleEmail} size="60"/><br/>
          <label for="Password">Password</label>
          <input type="password" id="Password" name="Password" defaultValue={this.state.Password}  onChange={this.handlePassword} size="60"/><br/><br/>
          <button>Sign In</button>
        </form>
        </div>
      </div>
    </div>
  );
  }
}

export default App;
