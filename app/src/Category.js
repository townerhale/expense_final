import React, { Component } from 'react'; 
import AppNav from './AppNav'; 
//type cc then hit enter for below 
class  Category extends Component {
    /*state is the internal storage of any component, not able to modify from outside
    state is internal to a react component, not supposed to update it directly*/ 
    state = { 
        isLoading: true, 
        Categories : [] 
     } 

     //sync calls - you send a request then you wait for the response 
     //async  calls- you send a request then you don't have to wait 
     /*componentDidMount method that tells React as soon as component is done,
      make async call to springboot end point called const response */ 
     async componentDidMount (){
        const response=await fetch('/api/categories') //go to package.json and change proxy
        const body = await response.json(); 
        this.setState({Categories :body , isLoading: false}); 
     }
     //render is in charge of processing jax file and returns as export
    render() {  
        
        const {Categories , isLoading} = this.state; 
        if (isLoading)
            return (<div> Loading...</div>)
        return (   //the call to AppNav returns the navigation bar for the Categories html 
            <div> 
                <AppNav/>  
                <h2> Categories</h2> 
                {
                    //get categories you have, for every single categoy create a div with category name
                    Categories.map( category => 
                        <div id = {category.id}> 
                            {category.name} 
                            </div>
                    )
                }
            </div>
         );
    }
}
 
export default Category;