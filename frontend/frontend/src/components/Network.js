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
   	{/* to thema mou einai edw oti otan kanw alert autes edw ts variables den exoune timh*/}
   		alert("user=",this.state.user_search)
   		alert("email=",this.state.email_address)
   		alert("id=",this.state.id)
   		{/* meta thelw na kanw to e3hs */}
   		if(this.state.user_search===this.state.email_address){
   			this.props.history.push({
	          pathname: "/Network/:"+this.state.id,
	          state :{
	          Email : this.state.email_address,
	          id: this.state.id,
	          page : "Network",
	          isLogin: true
	          }
       		})
   		}
   		{/* to opoio den doulevei akoma kai an oi times itan equal kai empaina st if */}
   	 	{/* ti ginetai loipon  egw thelw an auto pou dinw st forma einai idio me to email pou pairnw panw stn con
   	 	structor na mpainei st if kai na re render ton component me ta idia props omws gia na xerw an auto pou dinw einai idio me to email auto */}
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

   					{/* autes edw oi variables exoun kanonika ti timh pou thelw */}
   					<h2>{this.state.id}</h2>
   					<h2>{this.state.email_address}</h2>
   					<h2>{this.state.user_search}</h2>
   					{/* autes edw oi variables exoun kanonika ti timh pou thelw */}
   					<form onSubmit={this.Search}>
	                <label>Search UserEmail:</label>
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