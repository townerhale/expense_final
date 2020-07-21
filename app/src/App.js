import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'; //imports your router 
import Category from './Category'; 
import Home from './Home'; 
import Expenses from './Expenses';

//brings everything together(home, category) 
class App extends Component {
    state = {  }
    render() { 
        return ( 
            /* A router tells this app.js to create two pages that it can switch to, 
            one goes / to home directory, and one goes to /categories to category page
            binds {component} to category and home
            exact = {true} means path is exact} */ 
            <Router>
                <Switch>
                    <Route path = '/' exact = {true} component = {Home}/>
                    <Route path = '/categories' exact = {true} component = {Category} /> 
                    <Route path = '/expenses' exact = {true} component = {Expenses} /> 

                </Switch>
            </Router>
         );
    }
}
 
export default App;