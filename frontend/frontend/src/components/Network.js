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
import './Network.css'
class Network extends React.Component {
	constructor(props) {
   		super(props);
  		this.state = {
	     	email_address: "",
	     	id:-1,
	     	con:false,
	     	val1:"one",
	     	user_search:"",
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
    	this.Search=this.Search.bind(this);

    	this.giveValuetosearch=this.giveValuetosearch.bind(this);
  	}
  	giveValuetosearch(e){
  		this.setState({user_search: e.target.value});
  	}
  	Search(){
  		alert(this.state.user_search)
  		const formData=new FormData();
  		if(this.state.user_search==this.state.email_address){
  			alert("Cannot search the same email")
  			alert(this.state.email_address)
  		}
  		formData.append('email',this.state.user_search)
  		/*axios.post('http://127.0.0.1:8000/users/SearchEmail/',formData,{headers: {'Content-Type': 'application/json'}})
	    .then(response => {
	    	alert(this.state.val1)
	    }).catch(error => {
	    	alert("Something went wrong")
	    })*/
  	}
  	render(){
  		if(this.state.con === false ){
  			return (<Redirect to='/'/>);
  		}
  		else{
	  		return(
	  			<div>
	  			<Plot name={"Network"} id={this.state.id} email={this.state.email_address}/>
	  			<h1>My Network</h1>
	  			<form onSubmit={this.Search}>
			    <label>Search UserEmail:</label>
	  			<input type="text"  id="search_name" name="search_name" defaultValue={this.state.user_search}  onChange={this.giveValuetosearch} size="61"/>
	  			<button class="a">Submit</button>
	  			</form>
	  			</div>
	  		);
	  	}
  	}
}
export default withRouter(Network);