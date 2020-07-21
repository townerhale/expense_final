import React, { Component } from 'react';
import AppNav from './AppNav';  
import "react-datepicker"
import DatePicker from "react-datepicker"; //both import statements taken from npmjs website
import "react-datepicker/dist/react-datepicker.css";
import "./App.css"; //import our app css 
import {Container, Table, Input, Button, Label, Form, FormGroup} from 'reactstrap'; //this imports formgroups etc
import {Link} from 'react-router-dom'; 
import Moment from 'react-moment';

class Expenses extends Component {
    //we're constructing our packet that we will send to our api 
    emptyItem = {
        description: '', 
        expensedate : new Date(), 
        id: 104,
        location : '', 
        category : {id:1, name:'Travel'}
    }

    //props is something you pass to component, unable to change unlike state
    constructor(props){
        super(props) //passing the data to our superclass because the class Expenses extends Component

        this.state = {
                isLoading : false, //call api so we can get categories in expenses, handshake for when data is tehere
                categories : [],
                expenses: [], //an array of expenses that we will load and send to api
                date: new Date(), //date object is connected, referred to this.state.date  
                item : this.emptyItem //refers to our emptyItem we refer to 
        }
            this.handleSubmit = this.handleSubmit.bind(this); //binds this component . 
            this.handleChange = this.handleChange.bind(this); 
            this.handleDateChange = this.handleDateChange.bind(this); 
    }

    //to post data 
    async handleSubmit(event){
        const item = this.state.item; //automatically find the item 

        await fetch('/api/expenses', {
        method: 'POST', //call to your controller
        headers : {
            'Accept' : 'application/json', 
            'Content-Type' : 'application/json' 
        }, 
        body : JSON.stringify(item), //stringify converts js to json object
    }); 
        event.peventDefault(); //search popup like google
    this.props.history.push("/expenses"); //oncnpe you post you want to see it in expense list

    }

    handleChange(event){ //after you submit 
        const target= event.target; //target holds event value from click
        const value= target.value; //target is textbox 
        const name = target.name; //what is inside the text
        let item={...this.state.item}; // since its array containing a bunch of objects use ...
        item[name] = value; //whatever the item is, update it. 
        this.setState({item});//update state with new value 
        console.log(this.state);
      }

      handleDateChange(date){
        let item={...this.state.item};
        item.expensedate= date;
        this.setState({item});//update the data
        console.log(item);
      
      }

    //remove method 
    async remove(id){
        await fetch(`/api/expenses/${id}` , {
          method: 'DELETE' ,
          headers : {
            'Accept' : 'application/json', //same as a json call on postman
            'Content-Type' : 'application/json'
          }
          //when its done, create a function that updates the expenses
        }).then(() => {          // the ... is how youpass all the componends of the expense
          let updatedExpenses = [...this.state.expenses].filter(i => i.id !== id); //makes sure id doesnt converge
          this.setState({expenses : updatedExpenses});
        });

    }


   
     //this method is for immediately aftr component is mounted to page, it makes the call 
     async componentDidMount()
     {
         //react will update with data received through api 
         const response = await fetch('/api/categories'); 
         const body = await response.json(); //async goes with await, when we fetch data, comes back in json objectif its ready we'll let you know
         this.setState({categories: body, isLoading: false}); //going to put inside expenses, isLoading is now false because we just received data 

         const responseExp = await fetch('/api/expenses'); 
         const bodyExp = await responseExp.json(); 
         this.setState({expenses: bodyExp, isLoading: false});

     }
    render() { 
        const title = <h3> Add Expenses </h3>
        const {categories} = this.state; 
        const {expenses, isLoading} = this.state; //look for the isLoading and expenses and populate them 
        if (isLoading)
            return (<div> Loading...</div>)

        let optionList = 
        // <option tag means dropdown, refer to optionList down below {optionList} 
            categories.map( category => 
                <option value  = {category.id} key = {category.id}>
                    {category.name} 
                </option>
                )
        let rows = 
                expenses.map( expense => //for every single expense do the followigng things
                    <tr key = {expense.id}>  
                        <td>
                           {expense.descript}
                        </td>
                        <td>
                           {expense.location}
                        </td>
                        <td>
                            <Moment date={expense.expensedate} format="YYYY/MM/DD"/>
                        </td>
                        <td>
                            {expense.category.name}
                            </td>
                        <td>  
                           <Button size = "sm" color = "danger" onClick={() => this.remove(expense.id)} > Delete</Button></td>
                    </tr>) //this.remove(expense.id) is because in our backend expense requires a n id
        
        return ( 
        <div>
            <AppNav/>
            <Container> 
                {title} 
                <Form onSubmit = {this.handleSubmit}> 
                    <FormGroup>
                        <label for ="title">Title </label>
                        <input type = "text" name = "title" id = "title" 
                        onChange={this.handleChange} autoComplete = "name"/> 
                    </FormGroup>

                    <FormGroup>
                        <Label for="category" >Category</Label>
                        <select onChange={this.handleChange}>
                                {optionList}
                        </select>
                        </FormGroup>

                    <FormGroup>
                    <label for = "city">Date</label>  
                    <DatePicker selected = {this.state.item.expensedate} onChange = {this.handleDateChange}/>
                    </FormGroup> 

                <div className = "row"> 
                    <FormGroup className = "col-md-4 mb-3">
                    <label for = "location">Location</label> 
                    <input type = "text" name = "location" id = "location"  onChange={this.handleChange}/>
                    </FormGroup>
                    </div>

                    <FormGroup>
                        <Button color = "primary" type = "submit" >Save</Button>{' '}
                        <Button color = "secondary" tag = {Link} to = "/categories"> Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>

            {''}
                <Container>
                    <h3>Expense List</h3>
                    <Table className="mt-4">
                    <thead>
                        <tr>
                            <th width="20%">Description</th>
                            <th width="10%">Location</th>
                            <th> Date</th>
                            <th> Category </th>
                            <th width = "10%">Action</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {rows} 
                    </tbody>
                    </Table>
                </Container>
            </div> );
    }
}
 
export default Expenses;