import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css' 

import App from './App' //import this 

ReactDOM.render(
  <App/>,  //render home page
  document.getElementById('root') //get root div in index.html
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


/* Map of explanation: AppNav
                       |
                       V
                       Home.js Category.js Expenses.js
                       |
                       V
                       App.js
                       |
                       V
                       Index.js
*/ 
 
