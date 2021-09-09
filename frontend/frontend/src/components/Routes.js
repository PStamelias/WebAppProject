import React from 'react';
import App from '../App.js'
import Register from './Register.js'
import {Route,PrivateRoute} from 'react-router-dom';
import AdminPage from './AdminPage.js'
import UserPage from './UserPage.js'
import Settings from './Settings.js'
import Network from './Network.js'
import Notifications from './Notifications.js'
import Discussions from './Discussions.js'
import Ads from './Ads.js'
import Personal from './Personal.js'
import NewAd from './NewAd.js'
import PersonalInfo from './PersonalInfo.js'
function Routes() {
  return (
    <div>
      <Route  exact  path="/"                        component={App}/>
      <Route  exact  path="/register"                component={Register}/>
      <Route         path="/Admin"                   component={AdminPage}/>
      <Route         path="/UserPage/:id"            component={UserPage}/>
      <Route         path="/Network/:id"             component={Network}/>
      <Route         path="/Settings/:id"            component={Settings}/>
      <Route         path="/Notifications/:id"       component={Notifications}/>
      <Route         path="/Discussions/:id"         component={Discussions}/>
      <Route         path="/Personal/:id"            component={Personal}/>
      <Route         path="/Ads/:id"                 component={Ads}/>
      <Route         path="/NewAd/"                  component={NewAd}/>
      <Route         path="/PersonalInfo/:id"        component={PersonalInfo}/>
    </div>
  );
}

export default Routes;
