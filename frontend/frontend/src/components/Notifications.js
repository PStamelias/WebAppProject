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
class Notifications extends React.Component {
	constructor(props) {
   		super(props);
   		this.state = {
	     	email_address: "",
	     	id:-1,
	     	LinkData:[],
	     	name:"Nothing",
	     	con:false,
	    };
   		if(props.location.state == null){
    		this.state.con=false	
    	}
    	else{
    		this.state.con=true
    		this.state.email_address=props.location.state.Email
    		this.state.id=props.location.state.id
    	}
    	this.getLinks=this.getLinks.bind(this);
    	this.some=this.some.bind(this);
   	}
   	getLinks(){
   		const formData=new FormData()
   		formData.append("Email_Address",this.state.email_address)
   		axios.post('http://127.0.0.1:8000/users/GetLinks/',formData,{headers: {'Content-Type': 'application/json'}})
        .then(response => {
        	this.setState({LinkData:response.data["keywords"]});
        }).catch(error => {
            alert("Something went wrong")
        })
        this.setState({name:"Other"});
   	}
   	render(){
  		if(this.state.con === false ){
  			return (<Redirect to='/'/>);
  		}
  		else{
  			if(this.state.name=="Nothing"){
  				this.getLinks()
  			}
  			const Connection_Requests=[]
  			for (let i = 0; i < this.state.LinkData.length-1; i++) {
  				
  			}
	   		return(
	   			<div>
	   				<Plot name={"Notifications"} id={this.state.id} email={this.state.email_address}/>
	   				<h2>Connection_Requests</h2>
	   				{Connection_Requests}
	   				
	   			</div>
	   		);
   		}
   	}
}
export default Notifications;
