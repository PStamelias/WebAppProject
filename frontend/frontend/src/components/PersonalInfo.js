import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {useLocation} from "react-router-dom";
import Plot from './Plot.js'
import { BrowserRouter as Router} from 'react-router-dom';
import Info from './Info.js'
class PersonalInfo  extends React.Component {
  constructor(props) {
   	super(props);
     	this.state = {
          	id: -1,
      		name:"Nothing",
      		email_address:"",
      		con:false,
    	};
  	}
  	render() {
  		return(
  			<h1>Nikos Oikonomopoulos</h1>
  		);
  	}
}

export default PersonalInfo;
