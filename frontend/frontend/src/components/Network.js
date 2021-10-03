import React, { useEffect, useState } from "react";
import axios from 'axios';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {useLocation} from "react-router-dom";
import Plot from './Plot.js'
import {Route,PrivateRoute} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import './Network.css'
class Network extends React.Component {
	constructor(props) {
   		super(props);
   		this.state = {
	     	email_address: "",
	     	id:-1,
	     	con:false,
	     	user_search:"",
	     	name:"Nothing",
	     	Usersdata:[],
	    };
   		if(props.location.state == null){
    		this.state.con=false	
    	}
    	else{
    		this.state.con=true
    		this.state.email_address=props.location.state.Email
    		this.state.id=props.location.state.id
    	}
    	this.giveValuetosearch=this.giveValuetosearch.bind(this);
    	this.Search=this.Search.bind(this);
    	this.getData=this.getData.bind(this);
   	}
   	giveValuetosearch(e){
   		this.setState({user_search:e.target.value})
   	}
   	Search(){
   		this.props.history.push({
          pathname: "/Result/:"+this.state.id,
          state :{
          Email : this.state.email_address,
          user_search: this.state.user_search,
          id: this.state.id,
          typesearch:"No",
          page : "Ads",
          isLogin: true
          }
       })
   	}
   	getData(){
   		const formData=new FormData()
   		formData.append("Email_Address",this.state.email_address)
   		axios.post('http://127.0.0.1:8000/users/GetFriends/',formData,{headers: {'Content-Type': 'application/json'}})
        .then(response => {
        	this.setState({Usersdata:response.data["keywords"]});
        }).catch(error => {
            alert("Something went wrong")
        })
        this.setState({name:"Other"});
   	}
   	render(){
   		if(this.state.con === false ){
  			return (<Redirect to='/'/>);
  		}
   		else{
   			if(this.state.name=="Nothing"){
   				this.getData()
   			}
   			const items=[]
   			for (let i = 0; i < this.state.Usersdata.length;) {
   				items.push(<div class="grid-item">
   					<Link
					  to={{
					    pathname: "/Discussions/:"+this.state.Usersdata[i+1],
					    state: { Email: this.state.email_address, id: this.state.id,sender:this.state.Usersdata[i]}
					  }}><p>Start Discussion</p></Link>
   					<br/>
   					<Link
					  to={{
					    pathname: "/AllInfo/:"+this.state.Usersdata[i+1],
					    state: { email: this.state.Usersdata[i], id: this.state.Usersdata[i+1]}
					  }}>{this.state.Usersdata[i+2]}</Link>,{this.state.Usersdata[i+3]}</div>)
   				i=i+6
   			}
   			return(
   				<div>
   					<Plot name={"Network"} id={this.state.id} email={this.state.email_address}/>
   					<h1>My Network</h1>
   					<div class="grid-container">
   					{items}
   					</div>
   					<br/>
   					<br/>
   					<br/>
   					<br/>
   					<br/>
   					<br/>
   					<h3>Search User</h3>
   					<form onSubmit={this.Search}>
	                <label>Search:</label>
	                <input type="text"  id="search_name" name="search_name" defaultValue={this.state.user_search}  onChange={this.giveValuetosearch} size="61"/>
	                <br/>
	                <button class="bte">Submit</button>
	                </form>
   				</div>
   			);
   		}
   	}
}
export default Network;