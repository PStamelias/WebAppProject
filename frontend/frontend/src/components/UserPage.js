import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {useLocation} from "react-router-dom";
import Plot from './Plot.js'
import { BrowserRouter as Router} from 'react-router-dom';
import Info from './Info.js'
class UserPage  extends React.Component {
  constructor(props) {
   	super(props);
     	this.state = {
          id: -1,
      		name:"Nothing",
      		surname:"",
      		email_address:"",
      		Phone_Number: "",
      		Biography: "",
      		Professional_Experience: "",
      		con:false,
    	};
    	if(props.location.state == null){
        alert("edw1")
    		this.state.con=false	
    	}
    	else{
        alert("2")
    		this.state.con=props.location.state.isLogin
    		this.state.email_address=props.location.state.Email
        this.state.id=props.location.state.id
        alert(this.state.email_address)
        alert(this.state.id)
    	}
    	this.getData = this.getData.bind(this);
  	}
  	getData(){
      alert("Enter on getData")
  		const formData = new FormData();
  		formData.append('email',this.state.email_address)
  		axios.post('http://127.0.0.1:8000/users/retrieve/', formData, {headers: {'Content-Type': 'application/json'}})
        .then(response => {
          this.setState({id: response.data[0]});
        	this.setState({name: response.data[1]});
        	this.setState({surname: response.data[2]});
        	this.setState({Phone_Number: response.data[3]});
        	this.setState({Biography: response.data[4]});
        	this.setState({Professional_Experience: response.data[5]});
        }).catch(error => {
            alert("Something went wrong")
        })

  	}
  	render() {
  		if(this.state.con === false){
  			return (<Redirect to='/'/>);
  		}
  		else{
  			if(this.state.name === "Nothing"){
  				this.getData()
  			}
  			return(
          <div>
          <Plot name={"Main_Page"} id={this.state.id} email={this.state.email_address}/>
          <Info name={this.state.name} email_address={this.state.email_address} surname={this.state.surname} Phone_Number={this.state.Phone_Number}/>
          </div>
  			);
  		}
  	}
}

export default UserPage;
