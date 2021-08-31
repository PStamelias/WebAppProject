import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
function  AdminPage(props){
	if(props.location.state == null){
		return <Redirect to='/'/>
	}
	else{
		return(
		<div>
			<h1>Admin  Page</h1>
		</div> 
		)
	}
	
}
export default AdminPage;
