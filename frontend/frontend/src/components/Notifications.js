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
import './Notifications.css'
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
   	Accept(){
   		
   	}
   	Reject(){

   	}
   	render(){
  		if(this.state.con === false ){
  			return (<Redirect to='/'/>);
  		}
  		else{
  			if(this.state.name=="Nothing"){
  				this.getLinks()
  			}
  			const items=[]
  			for (let i = 0; i < this.state.LinkData.length-1;) {
  				items.push(<Link
					  to={{
					    pathname: "/PersonalInfo/:"+this.state.LinkData[i+1],
					    state: { email: this.state.LinkData[i], id: this.state.LinkData[i+1]}
					  }}>{this.state.LinkData[i]}</Link>)
					 items.push(<form onSubmit={this.Accept}><button class="test1">Accept</button></form>)
					 items.push(<form onSubmit={this.Reject}><button class="test2">Reject</button></form>)
					 items.push(<br/>)
				i=i+2
  			}
	   		return(
	   			<div>
	   				<Plot name={"Notifications"} id={this.state.id} email={this.state.email_address}/>
	   				<h2>Connection_Requests</h2>
	   				{items}
	   				
	   			</div>
	   		);
   		}
   	}
}
export default Notifications;
