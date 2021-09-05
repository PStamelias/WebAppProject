import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {useLocation} from "react-router-dom";
import Plot from "./Plot.js"
class Personal  extends React.Component {
	constructor(props) {
   		super(props);
   		this.state = {
			access:"Empty",
			Prof_Exp:"",
			Edu:"",
			Skills:"",
			valProf:false,
			valEdu:false,
			valSkills:false,
			id:-1,
			myval:"",
			email:"",
	   	};
	   	if(props.location.state == null){
	   		alert("here")
    		this.state.access="Empty"	
    	}
    	else{
    		this.state.access="Something"
    		alert("edw")
    		this.state.email=props.location.state.Email
    		this.state.id=props.location.state.id
    		alert(this.state.email)
    		alert(this.state.id)
    	}
    	this.handle_Prof_Exp=this.handle_Prof_Exp.bind(this);
    	this.handle_Edu=this.handle_Edu.bind(this);
    	this.handle_Skills=this.handle_Skills.bind(this);
    	this.handleSubmit=this.handleSubmit.bind(this);
    	this.SeenProf=this.SeenProf.bind(this);
    	this.SeenEducation=this.SeenEducation.bind(this);
    	this.SeenSkills=this.SeenSkills.bind(this);
  	}
  	handle_Prof_Exp(e){
  		this.setState({Prof_Exp: e.target.value});
  	}
  	handle_Edu(e){
  		this.setState({Edu: e.target.value});
  	}
  	handle_Skills(e){
  		this.setState({Skills: e.target.value});
  	}
  	SeenProf(){
  		this.setState({valProf:"true"});
  	}
  	SeenEducation(){
  		this.setState({valEdu:"true"});
  	}
  	SeenSkills(){
  		this.setState({valSkills:"true"});
  	}
  	handleSubmit(){
  		const formData = new FormData();
  		this.setState({myval:this.state.email});
  		alert(this.state.email)
  		formData.append('Email_Address',this.state.email)
  		formData.append('Professional_Experience',this.state.Prof_Exp);
  		formData.append('Education',this.state.Edu);
	    formData.append('Skills',this.state.Skills);
	    formData.append('PrivateProf_Experience',this.state.valProf)
	    formData.append('PrivateEducation',this.state.valEdu)
	    formData.append('PrivateSkills',this.state.valSkills)
	    axios.post('http://127.0.0.1:8000/users/Data_Send/', formData, {headers: {'Content-Type': 'application/json'}})
	    .then(response => {
	    	alert("Data Saved Successfully")
	    	alert("Current email=",this.state.email)
	    }).catch(error => {
	        alert('Error:Something went wrong on data sending');
	    }).finally(() => {
	    })
	    alert("Current email=",this.state.email)
	    this.props.history.push({
          pathname:"/UserPage/:"+this.state.id,
          state :{
          Email : this.state.email,
          id :  this.state.id,
          page : "Main_Page",
          isLogin: true
          }
       })

  	}
	render(){
		if(this.state.access === "Empty"){
			return (<Redirect to='/'/>);
		}
		else{
			return(
				<div>
				<Plot name={"Personal_information"} id={this.state.id} email={this.state.email}/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<form onSubmit={this.handleSubmit}>
				<label>Professional Experience:</label>
				<textarea id="Professional_Experience" name="Professional_Experience" defaultValue={this.state.Prof_Exp}  onChange={this.handle_Prof_Exp} rows="10" cols="100"></textarea>
				<br/>
				<input type="checkbox" id="type1" name="type1" />
				<label for="type1">Private</label><br/>
				<input type="checkbox" id="type2" name="type2" onChange={this.SeenProf}/>
				<label for="type2">Public</label><br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<label>Education:</label>
				<textarea id="Education" name="Education"  defaultValue={this.state.Edu}  onChange={this.handle_Edu} rows="10" cols="112"></textarea>
				<br/>
				<input type="checkbox" id="type3" name="type3"/>
				<label for="type3">Private</label><br/>
				<input type="checkbox" id="type4" name="type4" onChange={this.SeenEducation}/>
				<label for="type4">Public</label><br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<label>Skills:</label>
				<textarea id="Skills" name="Skills" defaultValue={this.state.Skills}  onChange={this.handle_Skills} rows="10" cols="116"></textarea>
				<br/>
				<input type="checkbox" id="type5" name="type5"/>
				<label for="type5">Private</label><br/>
				<input type="checkbox" id="type6" name="type6" onChange={this.SeenSkills}/>
				<label for="type6">Public</label><br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<br/>
				<button type="submit">Save</button>
				</form>
				</div>
			);
		}
	}
}
export default Personal;