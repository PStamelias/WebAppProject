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
import './Ads.css'
class Ads extends React.Component {
	constructor(props) {
   		super(props);
   		this.state = {
	     	email_address: "",
	     	id:-1,
	     	con:false,
	    };
	    if(props.location.state == null){
	    	alert("enter ston constructor")
    		this.state.con=false	
    	}
    	else{
    		this.state.con=true
    		this.state.email_address=props.location.state.Email
    		this.state.id=props.location.state.id
    	}
    	this.SubmitAd=this.SubmitAd.bind(this);
   	}
   	SubmitAd(){
   		alert(this.state.email_address)
   		alert(this.state.id)
   		this.props.history.push({
          pathname: "/NewAd/",
          state :{
          Email : this.state.email_address,
          id: this.state.id,
          page : "Ads",
          isLogin: true
          }
       })
   	}
   	CheckAds(){

   	}
   	render(){
  		if(this.state.con === false ){
  			return (<Redirect to='/'/>);
  		}
  		else{
	  		return(
	  			<div>
	  			<Plot name={"Ads"} id={this.state.id} email={this.state.email_address}/>
	  			<button class="ae" onClick={this.SubmitAd}>Insert Ad</button>
	  			<button class="be" onClick={this.CheckAds}>My Ads</button>
	  			</div>
	  		);
	  	}
  	}
}

export default Ads;