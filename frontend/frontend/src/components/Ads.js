import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {useLocation} from "react-router-dom";
import Settings from './Settings.js'
import Plot from './Plot.js'
import {Route,PrivateRoute} from 'react-router-dom';
import { withRouter} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './Ads.css'
class Ads extends React.Component {
	constructor(props) {
   		super(props);
   		this.state = {
	     	email_address: "",
	     	id:-1,
	     	con:false,
	     	name:"Nothing",
	     	emailofadcreator:"",
	     	textonsubmit:"",
	     	nameonsubmit:"",
	     	pos:-1,
	     	dataFriends:[],
	     	dataOthers:[],
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
    	this.handleChange=this.handleChange.bind(this)
    	this.SendRequest=this.SendRequest.bind(this)
    	this.SubmitAd=this.SubmitAd.bind(this)
    	this.CheckAds=this.CheckAds.bind(this)
    	this.getData=this.getData.bind(this)
   	}
   	SubmitAd(){
   		alert(this.state.email_address)
   		alert(this.state.id)
   		this.props.history.push({
          pathname: "/NewAd/",
          state :{
          Email : this.state.email_address,
          id: this.state.id,
          page : "Ads",
          isLogin: true
          }
       })
   	}
   	SendRequest(){
   		const formData=new FormData()
   		formData.append("Email_Address",this.state.emailofadcreator)
   		formData.append("NameAD",this.state.nameonsubmit)
   		formData.append("TextAD",this.state.textonsubmit)
   		formData.append("ApplicationUser",this.state.email_address)
   		axios.post('http://127.0.0.1:8000/users/SendReqAd/',formData,{headers: {'Content-Type': 'application/json'}})
        .then(response => {
        	alert("Requset sent Successfully")
        }).catch(error => {
            alert("Something went wrong")
        })
   		alert("mpika SendRequest")
   	}
   	CheckAds(){
		alert(this.state.email_address)
   		alert(this.state.id)
   		this.props.history.push({
          pathname: "/CheckAds/",
          state :{
          Email : this.state.email_address,
          id: this.state.id,
          page : "Ads",
          isLogin: true
          }
       })   		
   	}
   	getData(){
   		const formData=new FormData()
   		formData.append("Email_Address",this.state.email_address)
   		axios.post('http://127.0.0.1:8000/users/GetAdsFromFriends/',formData,{headers: {'Content-Type': 'application/json'}})
        .then(response => {
        	this.setState({dataFriends:response.data["keywords"]});
        }).catch(error => {
            alert("Something went wrong")
        })
        axios.post('http://127.0.0.1:8000/users/GetAdsFromOthers/',formData,{headers: {'Content-Type': 'application/json'}})
        .then(response => {
        	this.setState({dataOthers:response.data["keywords"]});
        }).catch(error => {
            alert("Something went wrong")
        })
   		this.setState({name:"Other"});
   	}
   	handleChange = param => e => {
   		alert(param)
   		this.setState({emailofadcreator:this.state.dataFriends[param]});
   		this.setState({nameonsubmit:this.state.dataFriends[param+1]});
   		this.setState({textonsubmit:this.state.dataFriends[param+2]});
	};
   	render(){
  		if(this.state.con === false ){
  			return (<Redirect to='/'/>);
  		}
  		else{
  			if(this.state.name=="Nothing"){
  				this.getData()
  			}
  			const AdsFr=[]
  			const AdsNotFr=[]
  			for (let i = 0; i < this.state.dataFriends.length;) {
  				AdsFr.push(
  					<div class="MyMode">
  					<p>Creator of Ad:{this.state.dataFriends[i]}</p>
  					<p>Name of Ad:{this.state.dataFriends[i+1]}</p>
  					<p>Text of Ad:{this.state.dataFriends[i+2]}</p>
  					<p>ApplicationsUsers of Ad:{this.state.dataFriends[i+3]}</p>
  					<form onSubmit={this.SendRequest}>
  					<input type="submit" value="Send Request"  onClick={this.handleChange(i)}/>
  					</form>
  					</div>
  				)
  				i=i+4
  			}
  			for (let i = 0; i < this.state.dataOthers.length;) {
  				AdsNotFr.push(
  					<div class="MyMode">
  					<p>Creator of Ad:{this.state.dataOthers[i]}</p>
  					<p>Name of Ad:{this.state.dataOthers[i+1]}</p>
  					<p>Text of Ad:{this.state.dataOthers[i+2]}</p>
  					<p>ApplicationsUsers of Ad:{this.state.dataOthers[i+3]}</p>
  					</div>
  				)
  				i=i+4
  			}
	  		return(
	  			<div>
	  			<Plot name={"Ads"} id={this.state.id} email={this.state.email_address}/>
	  			<button class="ae" onClick={this.SubmitAd}>Insert Ad</button>
	  			<button class="be" onClick={this.CheckAds}>My Ads</button>
	  			<br/>
	  			<br/>
	  			<br/>
	  			<br/>
	  			<br/>
	  			<br/>
	  			<br/>
	  			<br/>
	  			<br/>
	  			<br/>
	  			<br/>
	  			<h3>Ads from Friends</h3>
	  			{AdsFr}
	  			<h3>Ads from Unkwown Users</h3>
	  			{AdsNotFr}
	  			</div>
	  		);
	  	}
  	}
}

export default Ads;