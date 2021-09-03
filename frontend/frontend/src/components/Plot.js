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
	    	};
   		this.goSettings = this.goSettings.bind(this);
  	}
  	goSettings = event => {
  		event.preventDefault()
  		alert(this.props.id)
  		this.props.history.push({
          pathname: '/Settings/${this.props.id}',
          state :{
          Email : this.props.email,
          id: this.props.id,
          page : "Settings",
          isLogin: true
          }
       })
  	}
  	goHome = event =>{
  		event.preventDefault()
  		alert(this.props.id)
  		alert(this.props.email)
  		this.props.history.push({
          pathname: '/UserPage/${this.props.id}',
          state :{
          Email : this.props.email,
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
				  	<button class="button">Προσωπικά Στοιχεία</button>
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
				  <button class="button">Προσωπικά Στοιχεία</button>
				  <button class="button" onClick={this.Settings}>Ρυθμίσεις</button>
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
				  <button class="button">Προσωπικά Στοιχεία</button>
				  <button class="button" onClick={this.Settings}>Ρυθμίσεις</button>
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
				  <button class="button">Προσωπικά Στοιχεία</button>
				  <button class="button" onClick={this.Settings}>Ρυθμίσεις</button>
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
				  <button class="button">Προσωπικά Στοιχεία</button>
				  <button class="button" onClick={this.Settings}>Ρυθμίσεις</button>
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
				  <button class="buttonactive">Προσωπικά Στοιχεία</button>
				  <button class="button" onClick={this.Settings}>Ρυθμίσεις</button>
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
				  <button class="button">Προσωπικά Στοιχεία</button>
				  <button class="buttonactive" onClick={this.Settings}>Ρυθμίσεις</button>
				</div>
			);
		}
	}
}
export default withRouter(Plot);