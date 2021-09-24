import React, { useEffect, useState } from "react";
import axios from 'axios';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {useLocation} from "react-router-dom";
import Settings from './Settings.js'
import Plot from './Plot.js'
import {Route,PrivateRoute} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
class Discussions extends React.Component {
	constructor(props) {
   		super(props);
   		this.state = {
	     	email_address: "",
	     	id:-1,
	     	sender:"",
	     	Message:"",
	     	con:false,
	    };
   		if(props.location.state == null){
    		this.state.con=false	
    	}
    	else{
    		this.state.con=true
    		this.state.email_address=props.location.state.Email
    		this.state.id=props.location.state.id
    		this.state.sender=props.location.state.sender
    	}
    	this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleSubmit(){
    	alert(this.state.Message)
    	const formData=new FormData()
    	formData.append("Email_Address1",this.state.email_address)
    	formData.append("Email_Address2",this.state.sender)
    	formData.append("Content",this.state.Message)
    	axios.post('http://127.0.0.1:8000/users/SendMessage/',formData,{headers: {'Content-Type': 'application/json'}})
        .then(response => {
        	alert("Message Send Successfully")
        }).catch(error => {
            alert("Something went wrong")
        })
    }
    setVal(e){
    	this.setState({Message:e.target.value})
    }
   	render(){
  		if(this.state.con === false ){
  			return (<Redirect to='/'/>);
  		}
  		else{
  			if(this.state.sender!==undefined){
  				return(
  					<div>
  						<h2>Private Conversation</h2>
  						<h3>{this.state.email_address}</h3>
  						<h4> Send Message to {this.state.sender}</h4>
  						<form onSubmit={this.handleSubmit}>
  						<textarea id="Message" name="Message" defaultValue={this.state.Message}   onChange={this.setVal} rows="10" cols="116"></textarea>
  						<button>Submit</button>
  						</form>
  					</div>
  				);
  			}
  			else{
  				return(
	   				<div>
	   					<Plot name={"Discussions"} id={this.state.id} email={this.state.email_address}/>
	   				</div>
	   			);
  			}
   		}
   	}
}
export default Discussions;
