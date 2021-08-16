import React from 'react';
import App from '../App.js'
import Register from './Register.js'
import {Route} from 'react-router-dom';
function Routes() {
  return (
    <div>
      <Route  exact  path="/" component={App}/>
      <Route  exact  path="/register" component={Register}/>
    </div>
  );
}

export default Routes;
