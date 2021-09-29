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
import './Discussions.css'
class Discussions extends React.Component {
	constructor(props) {
   		super(props);
   		this.state = {
	     	email_address: "",
	     	id:-1,
	     	sender:"",
	     	Message:"",
	     	UserMessages:[],
	     	firstuser:"",
	     	name:"Nothing",
	     	anyBoxesChecked:0,
	     	Content:[],
	     	con:false,
	    };
   		if(props.location.state == null){
    		this.state.con=false	
    	}
    	else{
    		this.state.con=true
    		this.state.email_address=props.location.state.Email
    		this.state.id=props.location.state.id
    		this.state.sender=props.location.state.sender
    	}
    	this.handleSubmit=this.handleSubmit.bind(this)
    	this.setVal=this.setVal.bind(this)
    	this.Send=this.Send.bind(this)
    	this.handleActive=this.handleActive.bind(this)
    	this.getOther=this.getOther.bind(this)
    	this.getUserswithMessages=this.getUserswithMessages.bind(this)
    }
    handleSubmit(){
    	const formData=new FormData()
    	formData.append("Email_Address1",this.state.email_address)
    	formData.append("Email_Address2",this.state.sender)
    	axios.post('http://127.0.0.1:8000/users/SendMessage/',formData,{headers: {'Content-Type': 'application/json'}})
        .then(response => {
        	
        }).catch(error => {
            alert("Something went wrong")
        })
        const formData1=new FormData()
    	formData1.append("Email_Address1",this.state.email_address)
    	formData1.append("Email_Address2",this.state.sender)
    	formData1.append("Εmail_Field",this.state.email_address)
    	formData1.append("Content",this.state.Message)
    	axios.post('http://127.0.0.1:8000/users/SendMessageTwo/',formData1,{headers: {'Content-Type': 'application/json'}})
        .then(response => {
        	alert("Message Send Successfully")
        }).catch(error => {
            alert("Something went wrong")
        })
    }
    setVal(e){
    	this.setState({Message:e.target.value})
    }
    getUserswithMessages(){
    	const formData=new FormData()
    	formData.append("Email_Address",this.state.email_address)
    	axios.post('http://127.0.0.1:8000/users/getFriendswithMessages/',formData,{headers: {'Content-Type': 'application/json'}})
      	.then(response => {
        	this.setState({UserMessages:response.data["keywords"]});
      	}).catch(error => {
        	alert("Something went wrong")
      	})
      	axios.post('http://127.0.0.1:8000/users/getFriendswithMessagesTwo/',formData,{headers: {'Content-Type': 'application/json'}})
      	.then(response => {
        	this.setState({Content:response.data["keywords"]});
      	}).catch(error => {
        	alert("Something went wrong")
      	})
      	this.setState({name:"Other"});
    }
    Send(){
    	this.props.history.push({
          pathname:"/Discussions/:"+this.state.id,
          state :{
	        Email : this.state.email_address,
	        id: this.state.id,
	        sender: this.state.UserMessages[this.state.anyBoxesChecked],
	        page : "Main_Page",
	        isLogin: true
          }
       })
    }
    handleActive = (param1,param2) => (event) => {
    	const formData1=new FormData()
      	formData1.append("Email_Address1",this.state.email_address)
      	formData1.append("Email_Address2",param2)
      	this.state.Content=[]
      	axios.post('http://127.0.0.1:8000/users/getConversation/',formData1,{headers: {'Content-Type': 'application/json'}})
      	.then(response => {
        	this.setState({Content:response.data["keywords"]});
      	}).catch(error => {
        	alert("Something went wrong")
      	})
    	this.setState({anyBoxesChecked:param1});
    }

   	render(){
  		if(this.state.con === false ){
  			return (<Redirect to='/'/>);
  		}
  		else{
  			if(this.state.sender!==undefined){
  				return(
  					<div>
  						<h2>Private Conversation</h2>
  						<h3>{this.state.email_address}</h3>
  						<h4> Send Message to {this.state.sender}</h4>
  						<form onSubmit={this.handleSubmit}>
  						<textarea id="Message" name="Message" defaultValue={this.state.Message}   onChange={this.setVal} rows="10" cols="116"></textarea>
  						<button>Submit</button>
  						</form>
  					</div>
  				);
  			}
  			else{
  				if(this.state.name=="Nothing"){
  					this.getUserswithMessages()
  				}
  				const items=[]
				var e=this.state.anyBoxesChecked
  				for (let i = 0; i < this.state.UserMessages.length; ) {
  					if(i==e){
  						items.push(
	  						<div>
	  						<input type="checkbox" id="type1" checked={true} name="type1"  onClick={this.handleActive(i,this.state.UserMessages[i])}/>
							<label for="type1">{this.state.UserMessages[i]}</label><br/>
	  						</div>
  						)
  					}
  					else{
  						items.push(
  							<div>
  							<input type="checkbox" id="type1"  name="type1" checked={false} onClick={this.handleActive(i,this.state.UserMessages[i])}/>
							<label for="type1">{this.state.UserMessages[i]}</label><br/>
  							</div>
  						)	
  					}
  					i=i+1
  				}
  				const ke=[]
  				for (let i = 0; i < this.state.Content.length; ) {
  					ke.push(
  						<p>{this.state.Content[i]}:{this.state.Content[i+1]}</p>
  					)
  					i=i+2
  				}
  				ke.push(
  					<form onSubmit={this.Send}>
  						<button class="curr">New Message</button>
  					</form>
  				)
  				return(
	   				<div>
	   					<Plot name={"Discussions"} id={this.state.id} email={this.state.email_address}/>
	   					{items}
	   					<div class="p">
  						<h4>Conversation</h4>
  						{ke}
						</div>
	   				</div>
	   			);
  			}
   		}
   	}
}
export default Discussions;
