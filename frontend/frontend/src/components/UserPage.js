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
      		name:"Nothing",
      		surname:"",
      		email_address:"",
      		Phone_Number: "",
      		Biography: "",
      		Professional_Experience: "",
      		con:false,
    	};
    	if(props.location.state == null){
    		this.state.con=false	
    	}
    	else{
    		this.state.con=props.location.state.isLogin
    		this.state.email_address=props.location.state.Email
    	}
    	this.getData = this.getData.bind(this);
  	}
  	getData(){
  		const formData = new FormData();
  		formData.append('email',this.state.email_address)
  		axios.post('http://127.0.0.1:8000/users/retrieve/', formData, {headers: {'Content-Type': 'application/json'}})
        .then(response => {
        	this.setState({name: response.data[0]});
        	this.setState({surname: response.data[1]});
        	this.setState({Phone_Number: response.data[2]});
        	this.setState({Biography: response.data[3]});
        	this.setState({Professional_Experience: response.data[4]});
        }).catch(error => {
            alert("Something went wrong")
        })

  	}
  	render() {
  		if(this.state.con === false){
  			return (<Redirect to='/UserPage/Settings'/>);
  		}
  		else{
  			if(this.state.name ==="Nothing"){
  				this.getData()
  			}
  			return(
          <div>
          <Plot name={"Main_Page"}/>
          <Info name={this.state.name} email_address={this.state.email_address} surname={this.state.surname} Phone_Number={this.state.Phone_Number}/>
          </div>
  			);
  		}
  	}
}

export default UserPage;
