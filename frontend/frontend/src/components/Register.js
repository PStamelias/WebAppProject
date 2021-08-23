import React from 'react';
import './Register.css';
import axios from 'axios';
import Photo from './Photo.js';
const url = "http://127.0.0.1:8000/api/register";
class  Register extends React.Component{
   constructor(props) {
    super(props);
     this.state = {
      email: " ",
      Name: " ",
      Surname: "",
      selectedFile: null,
      Phone: " ",
      Password: " ",
      PasswordAgain: " ",
      con: " ",
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleSurname = this.handleSurname.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePasswordAgain = this.handlePasswordAgain.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleEmail(e) {
   this.setState({email: e.target.value});
  }
  handleName(e) {
   this.setState({Name: e.target.value});
  }
  handleSurname(e) {
   this.setState({Surname: e.target.value});
  }
  handlePhone(e) {
   this.setState({Phone: e.target.value});
  }
  handlePassword(e) {
   this.setState({Password: e.target.value});
  }
  handlePasswordAgain(e) {
   this.setState({PasswordAgain: e.target.value});
  }
  handleClick = () => {
    axios.post(url,{
      Name: this.state.Name,
      Surname: this.state.Surname,
      Email: this.state.email,
      Image: this.state.selectedFile,
      Phone: this.state.Phone,
      Password: this.state.Password,
      PasswordAgain: this.state.PasswordAgain
    })
    .then(function (response) {
      this.setState({con:'Success'});
    })
    .catch(function (error) {
       this.setState({con:'Error'});
    });
  }
   onFileChange = event => {
    
      // Update the state
      this.setState({ selectedFile: event.target.files[0] });
    
    };
    
    // On file upload (click the upload button)
    onFileUpload = () => {
    
      // Create an object of formData
      const formData = new FormData();
    
      // Update the formData object
      formData.append(
        "myFile",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
    
      // Details of the uploaded file
      console.log(this.state.selectedFile);
    
      // Request made to the backend api
      // Send formData object
    };
    
    // File content to be displayed after
    // file upload is complete
    fileData = () => {
    
      if (this.state.selectedFile) {
         
        return (
          <div>
            <h2>File Details:</h2>
             
<p>File Name: {this.state.selectedFile.name}</p>
 
             
<p>File Type: {this.state.selectedFile.type}</p>
 
             
<p>
              Last Modified:{" "}
              {this.state.selectedFile.lastModifiedDate.toDateString()}
            </p>
 
          </div>
        );
      } else {
        return (
          <div>
            <br />
          </div>
        );
      }
    };
  render() {
    return (
    <div>
    <h1>Register Page</h1>
    <form>
      <label>Name:</label><br/>
      <input  type="text" id="Name" name="Name" defaultValue={this.state.Name}  onChange={this.handleName} size="60"/><br/>
      <label>Surname:</label><br/>
      <input  type="text" id="Surname" name="Surname"  defaultValue={this.state.Surname}  onChange={this.handleSurname} size="60"/><br/>
      <label>Email_Address:</label><br/>
      <input  type="text" id="Email_Address" name="Email_Address" defaultValue={this.state.email} onChange={this.handleEmail} size="60"/><br/>
      <label>Phone_Number:</label><br/>
      <input  type="text" id="Phone_Number" name="Phone_Number" defaultValue={this.state.Phone} onChange={this.handlePhone} size="60"/><br/>
      <label>Password:</label><br/>
      <input  type="text" id="Password" name="Password" defaultValue={this.state.Password} onChange={this.handlePassword} size="60"/><br/>
      <label>Password_Again:</label><br/>
      <input  type="text" id="Password_Again" name="Password_Again" defaultValue={this.state.PasswordAgain} onChange={this.state.handlePasswordAgain} size="60"/><br/>
      <div>
            <label>Image</label><br/>
            <div>
                <input type="file" onChange={this.onFileChange} /><br/><br/>
                <button onClick={this.onFileUpload}>
                  Upload!
                </button>
            </div>
          {this.fileData()}
        </div>
      <br/>
      <br/>
      <button onClick={this.handleClick}>
      Submit
      </button>
    </form>
    </div>
  );
  }
}
 
export default Register;

