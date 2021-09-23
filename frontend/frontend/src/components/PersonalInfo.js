import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {useLocation} from "react-router-dom";
import Plot from './Plot.js'
import { BrowserRouter as Router} from 'react-router-dom';
import Info from './Info.js'
import './PersonalInfo.css'
class PersonalInfo  extends React.Component {
  constructor(props) {
   	super(props);
     	this.state = {
          id: -1,
      		name:"Nothing",
      		email_address:"",
          surname:"",
          Phone_Number:"",
          Biography:"",
          Professional_Experience:"",
          Education:"",
          Skills:"",
      		con:false,
    	};
      if(props.location.state == null){
        alert("edw1")
        this.state.con=false  
      }
      else{
        alert("22222222222222222")
        this.state.con=true
        this.state.email_address=props.location.state.email
        this.state.id=props.location.state.id
        alert(this.state.email_address)
        alert(this.state.id)
      }
      this.getData=this.getData.bind(this);
  	}
    getData(){
      const formData = new FormData();
      formData.append('Email_Address',this.state.email_address)
      alert("kal")
      alert(this.state.email_address)
      axios.post('http://127.0.0.1:8000/users/GetAllInfo/',formData,{headers: {'Content-Type': 'application/json'}})
      .then(response => {
        this.setState({email_address:response.data[0]});
        this.setState({name:response.data[1]});
        this.setState({surname:response.data[2]});
        this.setState({Phone_Number:response.data[3]});
        this.setState({Biography:response.data[4]});
        this.setState({Professional_Experience:response.data[5]});
        this.setState({Education:response.data[6]});
        this.setState({Skills:response.data[7]});
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
          <h1>User Details</h1>
    			<h3>Email:{this.state.email_address}</h3>
          <h3>Name:{this.state.name}</h3>
          <h3>Surname:{this.state.surname}</h3>
          <h3>Phone_Number:{this.state.Phone_Number}</h3>
          <h4>Biography:{this.state.Biography}</h4>
          <h4>Professional_Experience:{this.state.Professional_Experience}</h4>
          <h4>Education:{this.state.Education}</h4>
          <h4>Skills:{this.state.Skills}</h4>
          </div>
        );
  	 }
    }
}

export default PersonalInfo;
