import React from 'react';
import App from '../App.js'
import Register from './Register.js'
import {Route,PrivateRoute} from 'react-router-dom';
import AdminPage from './AdminPage.js'
import UserPage from './UserPage.js'
function Routes() {
  return (
    <div>
      <Route  exact  path="/" component={App}/>
      <Route  exact  path="/register" component={Register}/>
      <Route  path="/Admin" component={AdminPage}/>
      <Route  path="/UserPage" component={UserPage}/>
    </div>
  );
}

export default Routes;
