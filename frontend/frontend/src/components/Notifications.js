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
import './Notifications.css'
class Notifications extends React.Component {
	constructor(props) {
   		super(props);
   		this.state = {
	     	email_address: "",
	     	id:-1,
	     	LinkData:[],

	     	name:"Nothing",
	     	con:false,
            Likes:[],
            Comments:[],
	     	element:"",
	    };
   		if(props.location.state == null){
    		this.state.con=false	
    	}
    	else{
    		this.state.con=true
    		this.state.email_address=props.location.state.Email
    		this.state.id=props.location.state.id
    	}
    	this.getLinks=this.getLinks.bind(this)
    	this.Accept=this.Accept.bind(this)
    	this.Reject=this.Reject.bind(this)
        this.getData=this.getData.bind(this)
   	}
   	getLinks(){
   		const formData=new FormData()
   		formData.append("Email_Address",this.state.email_address)
   		axios.post('http://127.0.0.1:8000/users/GetLinks/',formData,{headers: {'Content-Type': 'application/json'}})
        .then(response => {
        	this.setState({LinkData:response.data["keywords"]});
        }).catch(error => {
            alert("Something went wrong")
        })
   	}
    getData(){
        const formData=new FormData()
        formData.append("Email_Address",this.state.email_address)
        axios.post('http://127.0.0.1:8000/users/GetLikes/',formData,{headers: {'Content-Type': 'application/json'}})
        .then(response => {
            this.setState({Likes:response.data["keywords"]});
        }).catch(error => {
            alert("Something went wrong")
        })
        axios.post('http://127.0.0.1:8000/users/GetComments/',formData,{headers: {'Content-Type': 'application/json'}})
        .then(response => {
            this.setState({Comments:response.data["keywords"]});
        }).catch(error => {
            alert("Something went wrong")
        })
        this.setState({name:"Other"});
    }
   	Accept(){
   		const formData=new FormData()
   		formData.append("Email_Address_Receiver",this.state.email_address)
   		formData.append("Email_Address_Sender",this.state.element)
   		axios.post('http://127.0.0.1:8000/users/RejectRequest/',formData,{headers: {'Content-Type': 'application/json'}})
        .then(response => {
        	
        }).catch(error => {
            alert("Something went wrong")
        })
        const formData1=new FormData()
        formData1.append("Email_Address",this.state.email_address)
        axios.post('http://127.0.0.1:8000/users/AcceptRequest/',formData1,{headers: {'Content-Type': 'application/json'}})
        .then(response => {
        	
        }).catch(error => {
            alert("Something went wrong")
        })
        axios.post('http://127.0.0.1:8000/users/AcceptRequestRoundTwo/',formData,{headers: {'Content-Type': 'application/json'}})
        .then(response => {
        	
        }).catch(error => {
            alert("Something went wrong")
        })
        const formData2=new FormData()
        formData2.append("Email_Address",this.state.element)
        axios.post('http://127.0.0.1:8000/users/AcceptRequest/',formData2,{headers: {'Content-Type': 'application/json'}})
        .then(response => {
        	
        }).catch(error => {
            alert("Something went wrong")
        })
        const formData3=new FormData()
        formData3.append("Email_Address_Receiver",this.state.element)
        formData3.append("Email_Address_Sender",this.state.email_address)
        axios.post('http://127.0.0.1:8000/users/AcceptRequestRoundTwo/',formData3,{headers: {'Content-Type': 'application/json'}})
        .then(response => {
        	
        }).catch(error => {
            alert("Something went wrong")
        })
        this.props.history.push({
         pathname: "/UserPage/:"+this.state.id,
         state :{
           Email : this.state.email_address,
           id: this.state.id,
           page : "Network",
           isLogin: true
         }
      })
   	}
   	Reject(){
   		const formData=new FormData()
   		formData.append("Email_Address_Receiver",this.state.email_address)
   		formData.append("Email_Address_Sender",this.state.element)
   		axios.post('http://127.0.0.1:8000/users/RejectRequest/',formData,{headers: {'Content-Type': 'application/json'}})
        .then(response => {
        	
        }).catch(error => {
            alert("Something went wrong")
        })
        this.props.history.push({
         pathname: "/UserPage/:"+this.state.id,
         state :{
           Email : this.state.email_address,
           id: this.state.id,
           page : "Network",
           isLogin: true
         }
      })
   	}	
   	handleClick = (param1) => (event) => {
   		this.setState({element:param1});
   	}
   	render(){
  		if(this.state.con === false ){
  			return (<Redirect to='/'/>);
  		}
  		else{
  			if(this.state.name=="Nothing"){
  				this.getLinks()
                this.getData()
  			}
  			const items=[]
            const OtherData=[]
            const Other=[]
  			for (let i = 0; i < this.state.LinkData.length-1;) {
  				items.push(<Link
					  to={{
					    pathname: "/PersonalInfo/:"+this.state.LinkData[i+1],
					    state: { email: this.state.LinkData[i], id: this.state.LinkData[i+1]}
					  }}>{this.state.LinkData[i]}</Link>)
					 items.push(<form onSubmit={this.Accept}><button  onClick={this.handleClick(this.state.LinkData[i])} class="test1">Accept</button></form>)
					 items.push(<form onSubmit={this.Reject}><button  onClick={this.handleClick(this.state.LinkData[i])} class="test2">Reject</button></form>)
					 items.push(<br/>)
				i=i+2
  			}
            for(let i=0;i< this.state.Likes.length;){
                OtherData.push(
                    <div class="mymoe">
                    <p>NameArticle:{this.state.Likes[i]}</p>
                    <p>TextArticle:{this.state.Likes[i+1]}</p>
                    <p>CurrentDate:{this.state.Likes[i+2]}</p>
                    <p>Likes_from:{this.state.Likes[i+3]}</p>
                    </div>
                )
                i=i+4
            }
            for(let i=0;i< this.state.Comments.length;){
                Other.push(
                    <div class="mymoe">
                    <p>NameArticle:{this.state.Comments[i]}</p>
                    <p>TextArticle:{this.state.Comments[i+1]}</p>
                    <p>CurrentDate:{this.state.Comments[i+2]}</p>
                    <p>Comments:</p>
                    <p>{this.state.Comments[i+3]}-{this.state.Comments[i+4]}</p>
                    </div>
                )
                i=i+5
            }
	   		return(
	   			<div>
	   				<Plot name={"Notifications"} id={this.state.id} email={this.state.email_address}/>
	   				<h2>Connection_Requests</h2>
	   				{items}
                    <h3>Articles with Likes from Friends</h3>
                    {OtherData}
                    <h3>Articles with Comments from Friends</h3>
                    {Other}
	   			</div>
	   		);
   		}
   	}
}
export default Notifications;
