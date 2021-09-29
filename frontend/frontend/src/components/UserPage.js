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
          Comment:"",
      		surname:"",
      		email_address:"",
          nameArticle:"",
          Articles:[],
          FrArticles:[],
          NotFrArticle:[],
      		Phone_Number: "",
      		Biography: "",
          Article:"",
      		Professional_Experience: "",
      		con:false,
    	};
    	if(props.location.state == null){
    		this.state.con=false	
    	}
    	else{
    		this.state.con=props.location.state.isLogin
    		this.state.email_address=props.location.state.Email
        this.state.id=props.location.state.id
    	}
    	this.getData = this.getData.bind(this);
      this.handleText=this.handleText.bind(this);
      this.getNoFrArticles=this.getNoFrArticles.bind(this)
      this.SendArticle=this.SendArticle.bind(this);
      this.handleName=this.handleName.bind(this);
      this.getArticles=this.getArticles.bind(this);
      this.Like=this.Like.bind(this)
      this.Comment=this.Comment.bind(this)
      this.handleComment=this.handleComment.bind(this)
  	}
    handleComment(e){
      this.setState({Comment: e.target.value});
    }
  	getData(){
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
    Like = (param1) => (event) => {
      const formData=new FormData()
      formData.append("Email_Address",this.state.email_address)
      formData.append("Creator",this.state.FrArticles[param1])
      formData.append("Name",this.state.FrArticles[param1+1])
      formData.append("Text",this.state.FrArticles[param1+2])
      formData.append("Date",this.state.FrArticles[param1+3])
      axios.post('http://127.0.0.1:8000/users/setLike/',formData,{headers: {'Content-Type': 'application/json'}})
      .then(response => {
        alert("Like done")
      }).catch(error => {
        alert("Something went wrong")
      })
    }
    Comment = (param1) => (event) => {
      const formData=new FormData()
      formData.append("Email_Address",this.state.email_address)
      formData.append("Creator",this.state.FrArticles[param1])
      formData.append("Name",this.state.FrArticles[param1+1])
      formData.append("Text",this.state.FrArticles[param1+2])
      formData.append("Date",this.state.FrArticles[param1+3])
      formData.append("Comment",this.state.Comment)
      axios.post('http://127.0.0.1:8000/users/setComment/',formData,{headers: {'Content-Type': 'application/json'}})
      .then(response => {
        alert("Comment done")
      }).catch(error => {
        alert("Something went wrong")
      })
    } 
    getFriendsArticles(){
      const formData=new FormData()
      formData.append("Email_Address",this.state.email_address)
      axios.post('http://127.0.0.1:8000/users/getFrArticles/',formData,{headers: {'Content-Type': 'application/json'}})
      .then(response => {
        this.setState({FrArticles:response.data["keywords"]});
      }).catch(error => {
        alert("Something went wrong")
      })
      
    }
    getNoFrArticles(){
      this.setState({name:"Other"});
      const formData=new FormData()
      formData.append("Email_Address",this.state.email_address)
      axios.post('http://127.0.0.1:8000/users/getNotFrArticles/',formData,{headers: {'Content-Type': 'application/json'}})
      .then(response => {
        this.setState({NotFrArticle:response.data["keywords"]});
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
          this.getFriendsArticles()
          this.getNoFrArticles()
  			}
        const items=[]
        for (let i = 0; i < this.state.Articles.length; ) {
          items.push(
            <div class="mymoe">
            <p>ArticleName:{this.state.Articles[i]}</p>
            <p>ArticleText:{this.state.Articles[i+1]}</p>
            <p>ArticleDate:{this.state.Articles[i+2]}</p>
            <p>------------------</p>
            </div>
          )
          i=i+3
        }
        const FrArt=[]
        for (let i = 0; i < this.state.FrArticles.length; ) {
          FrArt.push(
            <div class="mymoe">
            <p>Creator:{this.state.FrArticles[i]}</p>
            <p>Name:{this.state.FrArticles[i+1]}</p>
            <p>Text:{this.state.FrArticles[i+2]}</p>
            <p>Date:{this.state.FrArticles[i+3]}</p>
            <form onClick={this.Like(i)}><button>Like</button></form>
            <form onSubmit={this.Comment(i)}>
            <label for="Comment">Comment:</label><br/>
            <input type="text" id="Comment" name="Comment" defaultValue={this.state.Comment}  onChange={this.handleComment}/><br/>
            <input type="submit" value="Submit Comment"/>
            </form>
            </div>
          )
          i=i+4
        }
        const NotFrArt=[]
        for (let i = 0; i < this.state.NotFrArticle.length; ) {
          NotFrArt.push(
            <div class="mymoe">
            <p>Creator:{this.state.NotFrArticle[i]}</p>
            <p>ArticleName:{this.state.NotFrArticle[i+1]}</p>
            <p>ArticleText:{this.state.NotFrArticle[i+2]}</p>
            <p>ArticleDate:{this.state.NotFrArticle[i+3]}</p>
            <p>UserLike:{this.state.NotFrArticle[i+4]}</p>
            </div>
          )
          i=i+5
        }
  			return(
          <div id="main">
          <Plot name={"Main_Page"} id={this.state.id} email={this.state.email_address}/>
          <Info name={this.state.name} email_address={this.state.email_address} surname={this.state.surname} Phone_Number={this.state.Phone_Number}/>
          <div class="right">
          <h3>My Articles</h3>
          {items}
          <h3>Friends Articles</h3>
          {FrArt}
          <h3>Articles that Likes to Friends</h3>
          {NotFrArt}
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
