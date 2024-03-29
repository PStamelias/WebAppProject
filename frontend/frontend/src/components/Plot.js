import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {useLocation} from "react-router-dom";
import Settings from './Settings.js'
import {Route,PrivateRoute} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './Plot.css'
import { withRouter} from 'react-router-dom';
class Plot  extends React.Component {
	constructor(props) {
   		super(props);
   		 this.state = {
	     	 	email: "",
	     	 	id:-1,
	    	};
   		this.goSettings = this.goSettings.bind(this);
   		this.goHome =this.goHome.bind(this);
   		this.goPersonal=this.goPersonal.bind(this);
   		if(props.location.state != null){
	    		this.state.id=props.location.state.id
	    		this.state.email=props.location.state.Email
	    }
  	}
  	goNotifications = event =>{
  		this.props.history.push({
          pathname: "/Notifications/:"+this.props.id,
          state :{
          Email : this.props.email,
          id: this.props.id,
          page : "Notifications",
          isLogin: true
          }
       })
  	} 
  	goDiscussions   = event =>{
  		this.props.history.push({
          pathname: "/Discussions/:"+this.props.id,
          state :{
          Email : this.props.email,
          id: this.props.id,
          page : "Discussions",
          isLogin: true
          }
       })
  	}
  	goAds  = event =>{
  		this.props.history.push({
          pathname: "/Ads/:"+this.props.id,
          state :{
          Email : this.props.email,
          id: this.props.id,
          page : "Ads",
          isLogin: true
          }
       })
  	}
  	goSettings = event => {
  		this.props.history.push({
          pathname: "/Settings/:"+this.props.id,
          state :{
          Email : this.props.email,
          id: this.props.id,
          page : "Settings",
          isLogin: true
          }
       })
  	}
  	goNetWork = event =>{
  		this.props.history.push({
         pathname: "/Network/:"+this.props.id,
         state :{
	         Email : this.props.email,
	         id: this.props.id,
	         page : "Network",
	         isLogin: true
         }
      })
  	}
  	goPersonal = event =>{
  		this.props.history.push({
          pathname: "/Personal/:"+this.state.id,
          state :{
          Email : this.props.email,
          id: this.props.id,
          page : "Main_Page",
          isLogin: true
          }
       })
  	}
  	goHome = event =>{
  		this.props.history.push({
          pathname: "/UserPage/:"+this.state.id,
          state :{
          Email : this.props.email,
          id   :this.props.id,
          page : "UserPage",
          isLogin: true
          }
       })
  	}
	render() {
		if(this.props.name=="Main_Page"){
			return(
				<div>
					<button class="buttonactive" onClick={this.goHome}>Αρχική Σελίδα</button>
				  	<button class="button"onClick={this.goNetWork} >Δίκτυο</button>
				  	<button class="button" onClick={this.goAds}>Αγγελίες</button>
				  	<button class="button" onClick={this.goDiscussions}>Συζητήσεις</button>
				  	<button class="button" onClick={this.goNotifications}>Ειδοποιήσεις</button>
				  	<button class="button" onClick={this.goPersonal}>Προσωπικά Στοιχεία</button>
					<button class="button" onClick={this.goSettings}>Ρυθμίσεις</button>
				</div>
			);
		}
		if(this.props.name=="Network"){
			return(
				<div>
				  <button class="button" onClick={this.goHome}>Αρχική Σελίδα</button>
				  <button class="buttonactive" onClick={this.goNetWork}>Δίκτυο</button>
				  <button class="button" onClick={this.goAds}>Αγγελίες</button>
				  <button class="button"  onClick={this.goDiscussions}>Συζητήσεις</button>
				  <button class="button" onClick={this.goNotifications}>Ειδοποιήσεις</button>
				  <button class="button" onClick={this.goPersonal}>Προσωπικά Στοιχεία</button>
				  <button class="button" onClick={this.goSettings}>Ρυθμίσεις</button>
				</div>
			);
		}
		if(this.props.name=="Ads"){
			return(
				<div>
				  <button class="button" onClick={this.goHome}>Αρχική Σελίδα</button>
				  <button class="button" onClick={this.goNetWork}>Δίκτυο</button>
				  <button class="buttonactive" onClick={this.goAds}>Αγγελίες</button>
				  <button class="button"  onClick={this.goDiscussions}>Συζητήσεις</button>
				  <button class="button" onClick={this.goNotifications}>Ειδοποιήσεις</button>
				  <button class="button" onClick={this.goPersonal}>Προσωπικά Στοιχεία</button>
				  <button class="button" onClick={this.goSettings}>Ρυθμίσεις</button>
				</div>
			);
		}
		if(this.props.name=="Discussions"){
			return(
				<div>
				  <button class="button" onClick={this.goHome}>Αρχική Σελίδα</button>
				  <button class="button" onClick={this.goNetWork}>Δίκτυο</button>
				  <button class="button" onClick={this.goAds}>Αγγελίες</button>
				  <button class="buttonactive"  onClick={this.goDiscussions}>Συζητήσεις</button>
				  <button class="button" onClick={this.goNotifications}>Ειδοποιήσεις</button>
				  <button class="button" onClick={this.goPersonal}>Προσωπικά Στοιχεία</button>
				  <button class="button" onClick={this.goSettings}>Ρυθμίσεις</button>
				</div>
			);
		}
		if(this.props.name=="Notifications"){
			return(
				<div>
				  <button class="button" onClick={this.goHome}>Αρχική Σελίδα</button>
				  <button class="button" onClick={this.goNetWork}>Δίκτυο</button>
				  <button class="button" onClick={this.goAds}>Αγγελίες</button>
				  <button class="button" onClick={this.goDiscussions}>Συζητήσεις</button>
				  <button class="buttonactive" onClick={this.goNotifications}>Ειδοποιήσεις</button>
				  <button class="button" onClick={this.goPersonal}>Προσωπικά Στοιχεία</button>
				  <button class="button" onClick={this.goSettings}>Ρυθμίσεις</button>
				</div>
			);
		}
		if(this.props.name=="Personal_information"){
			return(
				<div>
				  <button class="button" onClick={this.goHome}>Αρχική Σελίδα</button>
				  <button class="button" onClick={this.goNetWork}>Δίκτυο</button>
				  <button class="button" onClick={this.goAds}>Αγγελίες</button>
				  <button class="button" onClick={this.goDiscussions}>Συζητήσεις</button>
				  <button class="button" onClick={this.goNotifications}>Ειδοποιήσεις</button>
				  <button class="buttonactive" onClick={this.goPersonal}>Προσωπικά Στοιχεία</button>
				  <button class="button" onClick={this.goSettings}>Ρυθμίσεις</button>
				</div>
			);
		}
		if(this.props.name=="Settings"){
			return(
				<div>
				  <button class="button" onClick={this.goHome}>Αρχική Σελίδα</button>
				  <button class="button" onClick={this.goNetWork}>Δίκτυο</button>
				  <button class="button" onClick={this.goAds}>Αγγελίες</button>
				  <button class="button" onClick={this.goDiscussions}>Συζητήσεις</button>
				  <button class="button" onClick={this.goNotifications}>Ειδοποιήσεις</button>
				  <button class="button" onClick={this.goPersonal}>Προσωπικά Στοιχεία</button>
				  <button class="buttonactive" onClick={this.goSettings}>Ρυθμίσεις</button>
				</div>
			);
		}
	}
}
export default withRouter(Plot);