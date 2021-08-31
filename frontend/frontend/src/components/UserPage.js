import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {useLocation} from "react-router-dom";


function  UserPage(props){
	if(props.location.state == null){
		return <Redirect to='/'/>
	}
	else{
		const formData = new FormData();
		axios.post('http://127.0.0.1:8000/users/retrieve_info/', props.location.state.Email, {headers: {'Content-Type': 'application/json'}})
	    .then(response => {
	    }).catch(error => {
	    }).finally(() => { //Redirecting to the home page.
	    })
		return(
		<div>
			<h1>User Page</h1>
		</div> 
		)
	}
}
export default UserPage;
