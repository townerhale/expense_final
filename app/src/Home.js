import React, { Component } from 'react'; //do imrc to start
import AppNav from './AppNav';

class Home extends Component { //do cc 
    state = {  }
    render() { 
        return (
            <div>
                <AppNav/> 
                <h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
                    Welcome to easy expense app!
                </h2>
            </div>
            
        );
    }
}
 
export default Home;