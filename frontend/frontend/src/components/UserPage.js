import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {useLocation} from "react-router-dom";
import Plot from './Plot.js'
import { BrowserRouter as Router} from 'react-router-dom';
import Info from './Info.js'
import './UserPage.css'
class UserPage  extends React.Component {
  constructor(props) {
   	super(props);
     	this.state = {
          id: -1,
      		name:"Nothing",
      		surname:"",
      		email_address:"",
          nameArticle:"",
          Articles:[],
      		Phone_Number: "",
      		Biography: "",
          Article:"",
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
      this.handleText=this.handleText.bind(this);
      this.SendArticle=this.SendArticle.bind(this);
      this.handleName=this.handleName.bind(this);
      this.getArticles=this.getArticles.bind(this);
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
    handleText(e){
      this.setState({Article: e.target.value});
    }
    handleName(e){
      this.setState({nameArticle: e.target.value});
    }
    SendArticle(){
      const formData=new FormData()
      var myCurrentDate = new Date();
      var date = myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth()+1) + '-' + myCurrentDate.getDate() +' '+ myCurrentDate.getHours()+':'+ myCurrentDate.getMinutes();
      formData.append("Email_Address",this.state.email_address)
      formData.append("TextArticle",this.state.Article)
      formData.append("NameArticle",this.state.nameArticle)
      formData.append("Current_date",date)
      alert("mpainw edw st sendarticle ")
      axios.post('http://127.0.0.1:8000/users/PostArticle/',formData,{headers: {'Content-Type': 'application/json'}})
      .then(response => {
        alert("Article posted Successfully")  
      }).catch(error => {
        alert("Something went wrong")
      })
    }
    getArticles(){
      const formData=new FormData()
      formData.append("Email_Address",this.state.email_address)
      axios.post('http://127.0.0.1:8000/users/getMyArticles/',formData,{headers: {'Content-Type': 'application/json'}})
      .then(response => {
        this.setState({Articles:response.data["keywords"]});
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
          this.getArticles()
  			}
        const items=[]
        for (let i = 0; i < this.state.Articles.length; ) {
          items.push(<p>Name:{this.state.Articles[i]}</p>)
          items.push(<p>Text:{this.state.Articles[i+1]}</p>)
          items.push(<p>Date:{this.state.Articles[i+2]}</p>)
          items.push(<p>------------------</p>)
          i=i+3
        }
  			return(
          <div id="main">
          <Plot name={"Main_Page"} id={this.state.id} email={this.state.email_address}/>
          <Info name={this.state.name} email_address={this.state.email_address} surname={this.state.surname} Phone_Number={this.state.Phone_Number}/>
          <div class="right">
          <h3>My Articles</h3>
          {items}
          <form onSubmit={this.SendArticle}>
          <h4>Submit New Article</h4>
          <label>Name of Article:</label>
          <textarea id="ArticleName" name="ArticleName" defaultValue={this.state.nameArticle}  onChange={this.handleName} rows="1" cols="50"></textarea>
          <label>Text of Article:</label>
          <textarea id="Article" name="Article" defaultValue={this.state.Article}  onChange={this.handleText} rows="10" cols="116"></textarea>
          <button>Submit</button>
          </form>
          </div>
          </div>
  			);
  		}
  	}
}

export default UserPage;
