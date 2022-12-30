import React from "react";
import { Form, FormCheck } from "react-bootstrap";
import { Calendar } from "react-bootstrap-icons";

function Filters(props) {

   const handleSearch = (targetName,e) => {
        e.preventDefault();

        if(targetName == 'startingDate' || targetName == 'endingDate'){
            if(e.target.value != ''){
                //convert string to timedate with zone
                let date = new Date(e.target.value);
                //convert timedate with zone to string
                let dateString = date.toISOString();
                props.setFilter({...props.filters,[targetName]:dateString})
            }
        }else{
            props.setFilter({...props.filters,[targetName]:e.target.value})
        }

    
        if(props.filters.id == '' && props.filters.name == '' && props.filters.startingDate == '' && props.filters.endingDate == ''){
            props.setFilter({})
        }
   }

  return (
    <>
    <div className="row">
      <div className="col-md-4">
      <label className="form-label">Board Id</label>
        <Form.Control type="text" placeholder="Board Id" onChange={(e)=>{handleSearch('id',e)}}/>
      </div>
      <div className="offset-md-1 col-md-4">
        <label className="form-label">Board Name</label>
        <Form.Control type="text" placeholder="Board Name"  onChange={(e)=>{handleSearch('name',e)}}/>
      </div>
      </div>
      <div className="row mt-2">
      <div className="col-md-4">
      <label className="form-label">Starting date</label>
        <Form.Control type="date" placeholder="Search by Board Name" onChange={(e)=>{handleSearch('startingDate',e)}} />
      </div>
      <div className=" offset-md-1 col-md-4">
      <label className="form-label"> Ending date</label>
        <Form.Control type="date" placeholder="Search by Board Name" onChange={(e)=>{handleSearch('endingDate',e)}}/>
      </div>
      </div>
    </>
  );
}

export default Filters;
