import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {useLocation} from "react-router-dom";
import {Route,PrivateRoute} from 'react-router-dom';
import { withRouter} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './CheckAds.css'
class NewAd extends React.Component {
	constructor(props) {
   		super(props);
   		this.state = {
	     	email_address: "",
	     	name:"Nothing",
	     	id:-1,
	     	Addata:[],
	     	con:false,
	    };
	    if(props.location.state == null){
	    	alert("enter ston constructor")
    		this.state.con=false	
    	}
    	else{
    		this.state.con=true
    		this.state.email_address=props.location.state.Email
    		this.state.id=props.location.state.id
    	}
    	this.getData=this.getData.bind(this);
   	}
   	getData(){
   		const formData=new FormData();
   		formData.append("Email_Address",this.state.email_address)
   		axios.post('http://127.0.0.1:8000/users/GetAds/',formData,{headers: {'Content-Type': 'application/json'}})
        .then(response => {
        	this.setState({Addata:response.data["keywords"]});
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
  			if(this.state.name==="Nothing"){
  				this.getData()
  			}
  			const items=[]
  			var e=0
		  	for (let i = 0; i < this.state.Addata.length; i++) {
		  		if(e%2==0){
		  			items.push(<p>NameAd:{this.state.Addata[i]}</p>)
		  			e=e+1	
		  		}
		  		else{
		  			items.push(<p>TextAd:{this.state.Addata[i]}</p>)
		  			items.push(<p>----------------------------</p>)
		  			e=e+1
		  		}
		  	}
	  		return(
	  			<div>
	  			<h2>My Ads</h2>
	  			{items}
	  			</div>
	  		);
	  	}
  	}
}

export default NewAd;