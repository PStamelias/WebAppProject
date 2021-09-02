import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {useLocation} from "react-router-dom";
class Settings  extends React.Component {
	constructor(props){
    	super(props);
  	}
	render(){
		return(
			<h1>Settings</h1>
		);
	}
}
export default Settings;