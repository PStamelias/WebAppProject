import React from 'react';
import './Register.css'
import Photo from './Photo.js'
function Register() {
  return (
    <div>
    <h1>Register Page</h1>
    <form>
      <label>Name:</label><br/>
      <input  type="text" id="Name" name="Name" value="" size="60"/><br/>
      <label>Surname:</label><br/>
      <input  type="text" id="Surname" name="Surname" value="" size="60"/><br/>
      <label>Email_Address:</label><br/>
      <input  type="text" id="Email_Address" name="Email_Address" value="" size="60"/><br/>
      <label>Phone_Number:</label><br/>
      <input  type="text" id="Phone_Number" name="Phone_Number" value="" size="60"/><br/>
      <label>Password:</label><br/>
      <input  type="text" id="Password" name="Password" value="" size="60"/><br/>
      <label>Password_Again:</label><br/>
      <input  type="text" id="Password_Again" name="Password_Again" value="" size="60"/><br/>
      <Photo/>
      <br/>
      <br/>
      <input type="submit" value="Sign Up"/><br/>
    </form>
    </div>
  );
}

export default Register;
