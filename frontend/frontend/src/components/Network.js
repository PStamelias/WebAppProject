import React, { useEffect, useState } from "react";
import axios from 'axios';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {useLocation} from "react-router-dom";
import Plot from './Plot.js'
import {Route,PrivateRoute} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import './Network.css'
class Network extends React.Component {
	constructor(props) {
   		super(props);
   		this.state = {
	     	email_address: "",
	     	id:-1,
	     	con:false,
	     	user_search:"",
	    };
   		if(props.location.state == null){
    		this.state.con=false	
    	}
    	else{
    		this.state.con=true
    		this.state.email_address=props.location.state.Email
    		this.state.id=props.location.state.id
    	}
    	this.giveValuetosearch=this.giveValuetosearch.bind(this);
    	this.Search=this.Search.bind(this);
   	}
   	giveValuetosearch(e){
   		this.setState({user_search:e.target.value})
   	}
   	Search(){
   		alert(this.state.user_search)
   		alert(this.state.email_address)
   		this.props.history.push({
          pathname: "/Result/:"+this.state.id,
          state :{
          Email : this.state.email_address,
          user_search: this.state.user_search,
          id: this.state.id,
          typesearch:"No",
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
   					<Plot name={"Network"} id={this.state.id} email={this.state.email_address}/>
   					<h1>My Network</h1>
   					<form onSubmit={this.Search}>
	                <label>Search:</label>
	                <input type="text"  id="search_name" name="search_name" defaultValue={this.state.user_search}  onChange={this.giveValuetosearch} size="61"/>
	                <br/>
	                <button class="bte">Submit</button>
	                </form>
   				</div>
   			);
   		}
   	}
}
export default Network;