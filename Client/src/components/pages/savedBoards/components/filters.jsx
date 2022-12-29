import React from "react";
import { Form, FormCheck } from "react-bootstrap";
import { Calendar } from "react-bootstrap-icons";

function Filters(props) {
  return (
    <>
    <div className="row">
      <div className="col-md-4">
      <label className="form-label">Board Id</label>
        <Form.Control type="text" placeholder="Board Id" onChange={(e)=>{
            e.target.value.length > 0 && props.setFilter(
                {
                    ...props.filters,
                    id: e.target.value
                }
            );
        }}/>
      </div>
      <div className="offset-md-1 col-md-4">
        <label className="form-label">Board Name</label>
        <Form.Control type="text" placeholder="Board Name" onChange={(e)=>{
            props.setFilter(
                {
                    ...props.filters,
                    name: e.target.value
                }
            );
        }}/>
      </div>
      </div>
      <div className="row mt-2">
      <div className="col-md-4">
      <label className="form-label">Starting date</label>
        <Form.Control type="date" placeholder="Search by Board Name" />
      </div>
      <div className=" offset-md-1 col-md-4">
      <label className="form-label"> Ending date</label>
        <Form.Control type="date" placeholder="Search by Board Name" />
      </div>
      </div>
    </>
  );
}

export default Filters;
