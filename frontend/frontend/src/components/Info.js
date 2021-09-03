import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {useLocation} from "react-router-dom";
import './Info.css'
class Info  extends React.Component {
	render(){
		return(
			<div class="Info">
  				<h4>User Details</h4>
  				<p>Email:{this.props.email_address}</p>
  				<p>Name:{this.props.name}</p>
  				<p>Surname:{this.props.surname}</p>
  				<p>Phone_Number:{this.props.Phone_Number}</p>
  				<p>Biography:</p>
  				<p>{this.props.Biography}</p>
  			</div>
		);
	}
}
export default Info;