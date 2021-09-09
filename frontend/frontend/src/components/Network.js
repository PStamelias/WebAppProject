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
import './Network.css'
export default function Network(props) {
	const [user_search, setuser_search] = useState("");
	const handleSearchValueChange = (e) => setuser_search(e.target.value);
	const [email_address,setemail_address]=useState("");
	const [id,setid]=useState(-1);
	const handleemail_addressChange = (e) => setemail_address(e.target.value);
	const handleidChange = (e) => setid(e.target.value);
	function Search(){
		alert(props.location.state.id)
		alert(props.location.state.Email)
		alert(user_search)
	}
	if(props.location.state==null){
		return (<Redirect to='/'/>);
	}
	else{
		return (
   			<div>
   				<Plot name={"Network"} id={props.location.state.id} email={props.location.state.email_address}/>
   				<h1>My Network</h1>
	  			<form onSubmit={Search}>
			    <label>Search UserEmail:</label>
			    <input type="text"  id="search_name" name="search_name" defaultValue={user_search}  onChange={handleSearchValueChange} size="61"/>
			    <button class="a">Submit</button>
			    </form>
   			</div>
   		);
	}
}