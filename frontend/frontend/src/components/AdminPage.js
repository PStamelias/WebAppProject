import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
class AdminPage  extends React.Component {
  constructor(props) {
   	super(props);
     	this.state = {
          id: -1,
      		name:"Nothing",
      		con:false,
      		ExportData:[],
      		Usersdata:[],
      		iddata:[],
      		button:"",
    	};
    	if(props.location.state == null){
        	alert("edw1")
    		this.state.con=false	
    	}
    	else{
        	alert("2")
    		this.state.con=true
    	}
    	this.getData=this.getData.bind(this);
    	this.handleXML=this.handleXML.bind(this);
    	this.handleJSON=this.handleXML.bind(this);
    	this.handle=this.handle.bind(this);
    	this.SeenProf=this.SeenProf.bind(this);
    }
    getData(){
    	axios.post('http://127.0.0.1:8000/users/GetUsers/', {headers: {'Content-Type': 'application/json'}})
        .then(response => {
        	this.setState({Usersdata:response.data["keywords"]});
        }).catch(error => {
            alert("Something went wrong")
        })
        axios.post('http://127.0.0.1:8000/users/GetId/', {headers: {'Content-Type': 'application/json'}})
        .then(response => {
        	this.setState({iddata:response.data["keywords"]});
        }).catch(error => {
            alert("Something went wrong")
        })
        this.setState({name:"Other"});
    }
    handleXML(){
    	this.setState({button:"XML"});
    	alert(this.state.ExportData)
    }
    handleJSON(){
    	this.setState({button:"JSON"});
    	alert(this.state.ExportData)
    }
    SeenProf(e){
    	let isChecked = e.target.name;
    	this.setState({ ExportData: [this.state.ExportData, isChecked] })
    	alert(isChecked)
    }
    handle(){
    	alert("here1")
    }
    render() {
    	if(this.state.con === false){
  			return (<Redirect to='/'/>);
  		}
			else{
				if(this.state.name ==="Nothing"){
					this.getData()
				}	
				const items=[]
		  	for (let i = 0; i < this.state.Usersdata.length; i++) {
		  		items.push(<input type="checkbox" id={this.state.Usersdata[i]} name={this.state.Usersdata[i]} onChange={this.SeenProf}/>)
		  		items.push(<Link
					  to={{
					    pathname: "/PersonalInfo/"+this.state.iddata[i],
					    state: { email: this.state.Usersdata[i], id: this.state.iddata[i]}
					  }}>{this.state.Usersdata[i]}</Link>)
					 items.push(<br/>)

		  	}
		    return(
		    	<div>
		    	<form onClick={this.handleXML}>
		    	<h1>Admin</h1>
		    	{items}
		    	<button>Export</button>
		    	</form>
		    	</div>
		    );
			
		}
    }
}

export default AdminPage;
