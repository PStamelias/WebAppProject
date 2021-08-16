import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
function App() {
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
          <input type="text" name="Email"/><br/>
          <label>Password</label>
          <input type="text" name="Password"/><br/><br/>
          <input type="submit"  class="button" value="Sign In"/>
        </form>
        </div>
      </div>
    </div>
  );
}

export default App;
