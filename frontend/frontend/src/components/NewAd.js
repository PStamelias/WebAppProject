import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {useLocation} from "react-router-dom";
import Settings from './Settings.js'
import Plot from './Plot.js'
import {Route,PrivateRoute} from 'react-router-dom';
import { withRouter} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './NewAd.css'
class NewAd extends React.Component {
	constructor(props) {
   		super(props);
   		this.state = {
	     	email_address: "",
	     	id:-1,
	     	AdName:"",
	     	TextAd:"",
	     	con:false,
	    };
   		if(props.location.state == null){
	    	alert("enter ston constructr")
    		this.state.con=false	
    	}
    	else{
    		this.state.con=true
    		this.state.email_address=props.location.state.Email
    		this.state.id=props.location.state.id
    	}
    	this.handleNameAd=this.handleNameAd.bind(this);
    	this.handleTextAd=this.handleTextAd.bind(this);
    	this.SubmitFunction=this.SubmitFunction.bind(this);
   	}
   	handleNameAd(e){
   		this.setState({AdName: e.target.value});
   	}
   	handleTextAd(e){
   		this.setState({TextAd: e.target.value});
   	}
   	SubmitFunction(){
   		const formData=new FormData()
   		formData.append('Email_Address',this.state.email_address)
   		formData.append('NameAD',this.state.AdName)
   		formData.append('TextAD',this.state.TextAd)
   		axios.post('http://127.0.0.1:8000/users/SubmitAd/', formData, {headers: {'Content-Type': 'application/json'}})
	    .then(response => {
	      alert('You have successfully submit the Ad');
	    }).catch(error => {
	      alert('Something went wrong on submiting the Ad');
	    }).finally(() => { //Redirecting to the home page.
	    })
   		this.props.history.push({
          pathname: "/Ads/:"+this.state.id,
          state :{
          Email : this.state.email_address,
          id: this.state.id,
          page : "Ads",
          isLogin: true
          }
       })
   	}
   	render(){
   		if(this.state.con === false ){
  			return (<Redirect to='/'/>);
  		}
  		else{
	   		return(
	   			<div>
	   			<h3>New Ad</h3>
	   			<br/>
	   			<form onSubmit={this.SubmitFunction}>
	   			<label>Name:</label>
	   			<textarea id="Name" name="Name" defaultValue={this.state.AdName}  onChange={this.handleNameAd} rows="1" cols="120"></textarea>
	   			<br/>
	   			<br/>
	   			<label>Description:</label>
	   			<textarea id="Description" name="Description" defaultValue={this.state.TextAd}  onChange={this.handleTextAd} rows="10" cols="116"></textarea>
	   			<button class="a">Submit</button>
	   			</form>
	   			</div>
	   		);
   		}
   	}
}
export default NewAd;