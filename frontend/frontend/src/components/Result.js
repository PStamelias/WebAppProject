import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {useLocation} from "react-router-dom";
import Plot from './Plot.js'
import { BrowserRouter as Router} from 'react-router-dom';
import './Result.css'
class Result  extends React.Component {
  constructor(props) {
   	super(props);
    this.state = {
      email_address: "",
      id:-1,
      con:false,
      user_search:"",
      id_result:"",
      check:'',
      isfriend:'',
      name:"Nothing",
    };
    if(props.location.state == null){
      this.state.con=false  
    }
    else{
      this.state.con=true
      this.state.email_address=props.location.state.Email
      this.state.id=props.location.state.id
      this.state.user_search=props.location.state.user_search
      this.state.val=props.location.state.typesearch
    }
    this.getData=this.getData.bind(this)
    this.getDataTwo=this.getDataTwo.bind(this)
    this.fun1=this.fun1.bind(this)
    this.ReturnId=this.ReturnId.bind(this)
    this.fun2=this.fun2.bind(this)
    this.Send_Request=this.Send_Request.bind(this)
  }
  fun1(){
    this.setState({check:"Exists"})
  }
  fun2(){
    this.setState({check:"Not-Exists"})
  }
  fun3(){
    this.setState({isfriend:"Yes"})
  }
  fun4(){
    this.setState({isfriend:"No"})
  }
  getData(){
    const formData=new FormData()
    formData.append("Email_Address",this.state.user_search)
    axios.post('http://127.0.0.1:8000/users/CheckIfExists/',formData,{headers: {'Content-Type': 'application/json'}})
    .then(response => {
      this.fun1()
    }).catch(error => {
      this.fun2()
    })
  }
  getDataTwo(){
    const formData=new FormData()
    formData.append("Email_Address_Search",this.state.user_search)
    formData.append("Email_Address",this.state.email_address)
    axios.post('http://127.0.0.1:8000/users/CheckIfFriend/',formData,{headers: {'Content-Type': 'application/json'}})
    .then(response => {
      this.fun3()
    }).catch(error => {
      this.fun4()
    })
  }
  ReturnId(){
    const formData=new FormData()
    formData.append("Email_Address_Search",this.state.user_search)
    axios.post('http://127.0.0.1:8000/users/ReturnId/',formData,{headers: {'Content-Type': 'application/json'}})
    .then(response => {
      this.setState({id_result:response.data})
    }).catch(error => {
      alert("Something went wrong")
    })
    this.setState({name:"Other"})
  }
  Send_Request(){
    const formData=new FormData()
    formData.append("Email_Address_Sender",this.state.email_address)
    formData.append("Email_Address_Receiver",this.state.user_search)
    axios.post('http://127.0.0.1:8000/users/Send_Request/',formData,{headers: {'Content-Type': 'application/json'}})
    .then(response => {
      this.fun3()
    }).catch(error => {
      this.fun4()
    })
    this.props.history.push({
         pathname: "/Network/:"+this.state.id,
         state :{
           Email : this.state.email_address,
           id: this.state.id,
           page : "Network",
           isLogin: true
         }
      })
  }
  render(){
    if(this.state.con === false){
      return(<Redirect to='/'/>);
    }
    else{
      if(this.state.name=="Nothing"){
        this.getData()
        this.getDataTwo()
        this.ReturnId()
      }
      if(this.state.check=="Exists"){
        if(this.state.isfriend=="Yes"){
          return(
            <div>
              <h4>User Result</h4>
              <Link
              to={{
              pathname: "/AllInfo/:"+this.state.id_result,
              state: { email: this.state.user_search, id: this.state.id_result}
            }}><p>{this.state.user_search}</p></Link>
            </div>
          );
        }
        else{
          return(
            <div>
              <h4>User Result</h4>
              <p>{this.state.user_search}</p>
              <div class="e">
              <form onSubmit={this.Send_Request}>
              <button>Send Request</button>
              </form>
              </div>
            </div>
          );
        }
      }
      else{
        return(
          <div>
            <h4>User Not Found</h4>
          </div>
        );
      }
    }
  }
}
export default Result;