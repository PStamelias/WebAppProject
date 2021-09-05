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
  	goSettings = event => {
  		alert(this.props.id)
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
  	goPersonal = event =>{
  		alert(this.props.id)
  		alert(this.props.email)
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
  		alert(this.props.id)
  		alert(this.props.email)
  		this.props.history.push({
          pathname: "/UserPage/:"+this.state.id,
          state :{
          Email : this.props.email,
          id   :this.props.id,
          page : "Main_Page",
          isLogin: true
          }
       })
  	}
	render() {
		if(this.props.name=="Main_Page"){
			return(
				<div>
					<button class="buttonactive" onClick={this.goHome}>Αρχική Σελίδα</button>
				  	<button class="button">Δίκτυο</button>
				  	<button class="button">Αγγελίες</button>
				  	<button class="button">Συζητήσεις</button>
				  	<button class="button">Ειδοποιήσεις</button>
				  	<button class="button" onClick={this.goPersonal}>Προσωπικά Στοιχεία</button>
					<button class="button" onClick={this.goSettings}>Ρυθμίσεις</button>
				</div>
			);
		}
		if(this.props.name=="Network"){
			return(
				<div>
				  <button class="button" onClick={this.goHome}>Αρχική Σελίδα</button>
				  <button class="buttonactive">Δίκτυο</button>
				  <button class="button">Αγγελίες</button>
				  <button class="button">Συζητήσεις</button>
				  <button class="button">Ειδοποιήσεις</button>
				  <button class="button" onClick={this.goPersonal}>Προσωπικά Στοιχεία</button>
				  <button class="button" onClick={this.goSettings}>Ρυθμίσεις</button>
				</div>
			);
		}
		if(this.props.name=="Ads"){
			return(
				<div>
				  <button class="button" onClick={this.goHome}>Αρχική Σελίδα</button>
				  <button class="button">Δίκτυο</button>
				  <button class="buttonactive">Αγγελίες</button>
				  <button class="button">Συζητήσεις</button>
				  <button class="button">Ειδοποιήσεις</button>
				  <button class="button" onClick={this.goPersonal}>Προσωπικά Στοιχεία</button>
				  <button class="button" onClick={this.goSettings}>Ρυθμίσεις</button>
				</div>
			);
		}
		if(this.props.name=="Discussions"){
			return(
				<div>
				  <button class="button" onClick={this.goHome}>Αρχική Σελίδα</button>
				  <button class="button">Δίκτυο</button>
				  <button class="button">Αγγελίες</button>
				  <button class="buttonactive">Συζητήσεις</button>
				  <button class="button">Ειδοποιήσεις</button>
				  <button class="button" onClick={this.goPersonal}>Προσωπικά Στοιχεία</button>
				  <button class="button" onClick={this.goSettings}>Ρυθμίσεις</button>
				</div>
			);
		}
		if(this.props.name=="Notifications"){
			return(
				<div>
				  <button class="button" onClick={this.goHome}>Αρχική Σελίδα</button>
				  <button class="button">Δίκτυο</button>
				  <button class="button">Αγγελίες</button>
				  <button class="button">Συζητήσεις</button>
				  <button class="buttonactive">Ειδοποιήσεις</button>
				  <button class="button" onClick={this.goPersonal}>Προσωπικά Στοιχεία</button>
				  <button class="button" onClick={this.goSettings}>Ρυθμίσεις</button>
				</div>
			);
		}
		if(this.props.name=="Personal_information"){
			return(
				<div>
				  <button class="button" onClick={this.goHome}>Αρχική Σελίδα</button>
				  <button class="button">Δίκτυο</button>
				  <button class="button">Αγγελίες</button>
				  <button class="button">Συζητήσεις</button>
				  <button class="button">Ειδοποιήσεις</button>
				  <button class="buttonactive" onClick={this.goPersonal}>Προσωπικά Στοιχεία</button>
				  <button class="button" onClick={this.goSettings}>Ρυθμίσεις</button>
				</div>
			);
		}
		if(this.props.name=="Settings"){
			return(
				<div>
				  <button class="button" onClick={this.goHome}>Αρχική Σελίδα</button>
				  <button class="button">Δίκτυο</button>
				  <button class="button">Αγγελίες</button>
				  <button class="button">Συζητήσεις</button>
				  <button class="button">Ειδοποιήσεις</button>
				  <button class="button" onClick={this.goPersonal}>Προσωπικά Στοιχεία</button>
				  <button class="buttonactive" onClick={this.goSettings}>Ρυθμίσεις</button>
				</div>
			);
		}
	}
}
export default withRouter(Plot);