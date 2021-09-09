import React, { useEffect, useState } from "react";
import axios from 'axios';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {useLocation} from "react-router-dom";
import Settings from './Settings.js'
import Plot from './Plot.js'
import {Route,PrivateRoute} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
export default function Notifications(props) {
	if(props.location.state==null){
		return (<Redirect to='/'/>);
	}
	else{
		return (
   			<div>
   				<Plot name={"Notifications"} id={props.location.state.id} email={props.location.state.Email}/>
   			</div>
   		);
	}
}