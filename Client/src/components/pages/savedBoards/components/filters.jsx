import React from "react";
import { Form, FormCheck } from "react-bootstrap";
import { Calendar } from "react-bootstrap-icons";

function Filters(props) {
  const handleSearch = (targetName, e) => {
    e.preventDefault();

    if (targetName == "startDate" || targetName == "endDate") {
      if (e.target.value != "") {
        //convert string to timedate with format yyyy-mm-dd
        let date = new Date(e.target.value);
        date = date.toISOString().split("T")[0];

        props.setFilter({ ...props.filters, [targetName]: date });
      }
    } else {
      props.setFilter({ ...props.filters, [targetName]: e.target.value });
    }

    if (
      props.filters.id == "" &&
      props.filters.name == "" &&
      props.filters.startDate == "" &&
      props.filters.endDate == ""
    ) {
      props.setFilter({});
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <label className="form-label">Board Id</label>
          <Form.Control
            type="text"
            placeholder="Board Id"
            onChange={(e) => {
              handleSearch("id", e);
            }}
          />
        </div>
        <div className="offset-md-1 col-md-4">
          <label className="form-label">Board Name</label>
          <Form.Control
            type="text"
            placeholder="Board Name"
            onChange={(e) => {
              handleSearch("name", e);
            }}
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-4">
          <label className="form-label">Starting date</label>
          <Form.Control
            type="date"
            placeholder="Search by Board Name"
            onChange={(e) => {
              handleSearch("startDate", e);
            }}
          />
        </div>
        <div className=" offset-md-1 col-md-4">
          <label className="form-label"> Ending date</label>
          <Form.Control
            type="date"
            placeholder="Search by Board Name"
            onChange={(e) => {
              handleSearch("endDate", e);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Filters;
