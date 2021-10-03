import React from 'react';
import './Register.css';
import axios from 'axios';
class  Register extends React.Component{
   constructor(props) {
    super(props);
     this.state = {
      email: "",
      Name: "",
      Surname: "",
      selectedFile: null,
      Phone: "",
      Biography:"",
      Password: "",
      PasswordAgain: "",
      val1:true,
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleSurname = this.handleSurname.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePasswordAgain = this.handlePasswordAgain.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.checkTypes= this.checkTypes.bind(this);
    this.onFileChange=this.onFileChange.bind(this);
    this.doneee=this.doneee.bind(this);
    this.onFileUpload=this.onFileUpload.bind(this);
    this.fileData=this.fileData.bind(this);
    this.handleBiography=this.handleBiography.bind(this);
  }
  handleBiography(e){
    this.setState({Biography: e.target.value});
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
  checkTypes = () => {
    if(this.state.email !== null && this.state.email !== '') {
      this.state.val1=true;
    }
    else{
      alert('Empty email')
      this.state.val1=false;
    }

    if(this.state.Name !== null && this.state.Name !== '') {
      this.state.val1=true;
    }
    else{
      alert('Empty Name')
      this.state.val1=false;
    }

    if(this.state.Surname !== null && this.state.Surname !== '') {
      this.state.val1=true;
    }
    else{
      alert('Empty Surname')
      this.state.val1=false;
    }

    if(this.state.Phone !== null && this.state.Phone !== '') {
     this.state.val1=true;
    }
    else{
      alert('Empty Phone')
      this.state.val1=false;
    }

    if(this.state.Password !== null && this.state.Password !== '') {
      this.state.val1=true;
    }
    else{
      alert('Empty Password')
      this.state.val1=false;
    }

    if(this.state.PasswordAgain !== null && this.state.PasswordAgain !== '') {
      this.state.val1=true;
    }
    else{
      alert(this.state.PasswordAgain)
      alert('Empty PasswordAgain')
      this.state.val1=false;
    }

    if(this.state.PasswordAgain!==this.state.Password){
      alert('Error:Password must be the same between the fields')
      this.state.val1=false;
    }

  }
  doneee = event => {
      event.preventDefault()
      this.checkTypes()
      if(this.state.val1==true){
        this.handleClick()
      }
      else{
        this.props.history.push("/");
      }
    }
  handleClick = () => {
    const formData = new FormData();
    formData.append('Email_Address',this.state.email);
    formData.append('Name',this.state.Name);
    formData.append('Surname',this.state.Surname);
    formData.append('Phone_Number',this.state.Phone);
    formData.append('Password',this.state.Password);
    /*formData.append('Image', this.state.selectedFile)*/
    axios.post('http://127.0.0.1:8000/users/userList/', formData, {headers: {'Content-Type': 'application/json'}})
    .then(response => {
      alert('You have successfully registered! Log in now to use the application');
    }).catch(error => {
      alert('Error:Email Address already in use');
    }).finally(() => { //Redirecting to the home page.
      this.props.history.push("/");
    })
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
    <form onSubmit={this.doneee}>
      <label>Name:</label><br/>
      <input  type="text" id="Name" name="Name" defaultValue={this.state.Name}  onChange={this.handleName} size="60"/><br/>
      <label>Surname:</label><br/>
      <input  type="text" id="Surname" name="Surname"  defaultValue={this.state.Surname}  onChange={this.handleSurname} size="60"/><br/>
      <label>Email_Address:</label><br/>
      <input  type="text" id="Email_Address" name="Email_Address" defaultValue={this.state.email} onChange={this.handleEmail} size="60"/><br/>
      <label>Phone_Number:</label><br/>
      <input  type="text" id="Phone_Number" name="Phone_Number" defaultValue={this.state.Phone} onChange={this.handlePhone} size="60"/><br/>
      <label>Password:</label><br/>
      <input  type="password" id="Password" name="Password" defaultValue={this.state.Password} onChange={this.handlePassword} size="60"/><br/>
      <label>Password_Again:</label><br/>
      <input  type="password" id="Password_Again" name="Password_Again" defaultValue={this.state.PasswordAgain} onChange={this.handlePasswordAgain} size="60"/><br/>
      <label>Biography:</label><br/>
      <textarea id="Biography" name="Biography" defaultValue={this.state.Biography}  onChange={this.handleBiography} rows="10" cols="116"></textarea>
      <div>
            <label>Image</label><br/>
            <div>
                <input type="file" onChange={this.onFileChange} /><br/><br/>
                <button class="somev1" onClick={this.onFileUpload}>
                  Upload!
                </button>
            </div>
          {this.fileData()}
        </div>
      <br/>
      <br/>
      <button class="some"> Submit </button>
    </form>
    </div>
  );
  }
}
 
export default Register;