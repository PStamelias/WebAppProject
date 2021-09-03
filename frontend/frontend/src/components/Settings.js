import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {useLocation} from "react-router-dom";
import Plot from "./Plot.js"
class Settings  extends React.Component {
	constructor(props){
    	super(props);
    	this.state = {
            id: -1,
      		new_email_address:"",
      		Password:"",
      		email_address:"",
      		new_password:"",
      		new_password_again:"",
      		con:true,
      		don:true,
    	};
    	if(props.location.state == null){
    		this.state.con=false	
    	}
    	else{
    		this.state.con=props.location.state.isLogin
    		this.state.email_address=props.location.state.Email
    		this.state.id=props.location.state.id
    	}
    	this.handleEmail=this.handleEmail.bind(this);
    	this.handlePassword_onchange_Email=this.handlePassword_onchange_Email.bind(this);
    	this.check_Types=this.check_Types.bind(this);
    	this.handleClickOne=this.handleClickOne.bind(this);
    	this.handle_Change_Email=this.handle_Change_Email.bind(this);
    	this.handle_Change_Password=this.handle_Change_Password.bind(this);
    	this.check_TypesTwo=this.check_TypesTwo.bind(this);
    	this.handlePassword_onchange_Password=this.handlePassword_onchange_Password.bind(this);
    	this.handleNewPassword_onchange_Password=this.handleNewPassword_onchange_Password.bind(this);
    	this.handleNewPasswordAgain_onchange_Password=this.handleNewPasswordAgain_onchange_Password.bind(this)
  	}
  	handleEmail(e){
  		this.setState({new_email_address: e.target.value});
  	}
  	handlePassword_onchange_Email(e){
  		this.setState({Password: e.target.value});
  	}
  	handlePassword_onchange_Password(e){
  		this.setState({Password: e.target.value});
  	}
  	handleNewPassword_onchange_Password(e){
  		this.setState({new_password: e.target.value});
  	}
  	handleNewPasswordAgain_onchange_Password(e){
  		this.setState({new_password_again: e.target.value});
  	}
  	check_Types(){
  		if(this.state.new_email_address !== null && this.state.new_email_address !== '') {
	      this.state.don=true;
	    }
	    else{
	      alert('Empty email')
	      this.state.don=false;
	    }
	    if(this.state.Password !== null && this.state.Password !== '') {
	      this.state.don=true;
	    }
	    else{
	      alert('Empty Password')
	      this.state.don=false;
	    }
  	}
  	handleClickOne(e){
  		const formData = new FormData();
  		formData.append('current_email',this.state.email_address);
	    formData.append('new_email',this.state.new_email_address);
	    formData.append('Password',this.state.Password);
	    formData.append('id',this.state.id)
	    axios.post('http://127.0.0.1:8000/users/Email_Change/', formData, {headers: {'Content-Type': 'application/json'}})
	    .then(response => {
	    	alert("Email Address Successfully Changed")
	    }).catch(error => {
	        alert('Error:Something went wrong on changing Email');
	    }).finally(() => { //Redirecting to the  page.
	       alert(this.state.con)
	       alert(this.state.id)
	    })
	}
  	handle_Change_Email(e){
  		this.check_Types()
  		if(this.state.don==true){
      		this.handleClickOne()
   		}
  	}
  	handleClickTwo(){
  		const formData = new FormData();
  		formData.append('current_password',this.state.Password);
  		formData.append('current_email',this.state.email_address);
	    formData.append('new_password',this.state.new_password);
	    formData.append('id',this.state.id)
	    axios.post('http://127.0.0.1:8000/users/Password_Change/', formData, {headers: {'Content-Type': 'application/json'}})
	    .then(response => {
	    	alert("Password Successfully Changed")
	    }).catch(error => {
	        alert('Error:Something went wrong on changing Password');
	    }).finally(() => { //Redirecting to the  page.
	       alert(this.state.con)
	       alert(this.state.id)
	    })
  	}
  	check_TypesTwo(){
  		if(this.state.Password !== null && this.state.Password !== '') {
	      this.state.don=true;
	    }
	    else{
	      alert('Empty Password')
	      this.state.don=false;
	    }

	    if(this.state.new_password !== null && this.state.new_password !== '') {
	      this.state.don=true;
	    }
	    else{
	      alert('Empty new_password')
	      this.state.don=false;
	    }

	    if(this.state.new_password_again !== null && this.state.new_password_again !== '') {
	      this.state.don=true;
	    }
	    else{
	      alert('Empty new_password_again')
	      this.state.don=false;
	    }
	    if(this.state.new_password!==this.state.new_password_again){
      		alert('Error:Password must be the same between the fields')
      		this.state.don=false;
    	}
  	}
  	handle_Change_Password(e){
  		this.check_TypesTwo()
  		if(this.state.don==true){
      		this.handleClickTwo()
   		}
  	}
	render(){
		if(this.state.con === false ){
  			return (<Redirect to='/'/>);
  		}
  		else{
			return(
				<div>
				/*edw tha perpei na steilw kai to kainourgio email*/
					<Plot name={"Settings"} id={this.state.id} email={this.state.email_address}/>
					 <h4>Change Email</h4>
					 <form onSubmit={this.handle_Change_Email}>
			          <label>New Email Address:</label>
			          <input type="text"  id="Email" name="Email" defaultValue={this.state.new_email_address}  onChange={this.handleEmail} size="61"/><br/>
			          <label for="Password">Password:</label>
			          <input  type="password" id="Password" name="Password" defaultValue={this.state.Password}  onChange={this.handlePassword_onchange_Email}  size="69"/><br/><br/>
			          <button>Submit</button>
			        </form>
			        <br/>
			        <br/>
			        <br/>
			        <br/>
			        <br/>
			        <br/>
			        <br/>
			        <h4>Change Password</h4>
			        <form onSubmit={this.handle_Change_Password}>
			        <label>Password:</label>
			        <input type="password"  id="Password" name="password" defaultValue={this.state.email}  onChange={this.handlePassword_onchange_Password} size="78"/><br/>
			        <label >New Password:</label>
			        <input  type="password" id="newPassword" name="newPassword" defaultValue={this.state.new_password}  onChange={this.handleNewPassword_onchange_Password}  size="74"/><br/>
					<label >New Password Again:</label>
			        <input  type="password" id="newPassword_again" name="newPassword_again" defaultValue={this.state.new_password_again}  onChange={this.handleNewPasswordAgain_onchange_Password}  size="69"/><br/><br/>
					<button>Submit</button>
					</form>
				</div>
			);
		}
	}
}
export default Settings;