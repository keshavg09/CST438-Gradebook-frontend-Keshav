import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import {SERVER_URL} from '../constants.js'
import { TextField } from '@mui/material';

class NewAssignment extends React.Component {
    constructor(props) {
      super(props);
      this.state = {assignName: '', dueDate: '', courseId: 0};
    };

    handleChange = (event) => {
        if (event.target.name == "name"){
            this.setState({assignName: event.target.value});
        }
        else if (event.target.name == "date"){
            this.setState({dueDate: event.target.value});
        }
        else if (event.target.name == "courseid"){
            this.setState({courseId: event.target.value});
        }
    }

    handleAdd = ( ) => {
        console.log("Gradebook.handleAdd");
        const token = Cookies.get('XSRF-TOKEN');
        
        fetch(`${SERVER_URL}/assignment` , 
            {  
              method: 'POST', 
              headers: { 'Content-Type': 'application/json',
                         'X-XSRF-TOKEN': token }, 
              body: JSON.stringify({assignmentName: this.state.assignName, dueDate: this.state.dueDate, courseId: this.state.courseId})
            } )
        .then(res => {
            if (res.ok) {
              toast.success("Assignment successfully added", {
              position: toast.POSITION.BOTTOM_LEFT
              });
            } else {
              toast.error("Assignment adding failed", {
              position: toast.POSITION.BOTTOM_LEFT
              });
              console.error('Put http status =' + res.status);
        }})
          .catch(err => {
            toast.error("Error in assignment adding", {
              position: toast.POSITION.BOTTOM_LEFT
            });
            console.error(err);
          });
     };  


  
  render() {
    return(
        <div>
        <ToastContainer autoClose={1500} /> 
        <TextField style={{paddingBottom: 20}} autoFocus label="Assignment Name" name="name" onChange={this.handleChange} />
        <br></br>
        <TextField style={{paddingBottom: 20}} autoFocus label="Due Date" name="date" onChange={this.handleChange} />
        <br></br>
        <TextField autoFocus label="Course Id" name="courseid" onChange={this.handleChange} /> 
        <br></br>
        <Button component={Link} to={{pathname:'/'}} variant="outlined" color="primary" style={{margin: 10}}>
        Cancel
        </Button>
        <Button id="Add" variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleAdd}>Add</Button>
        </div>
    );
  }
}  

export default NewAssignment;