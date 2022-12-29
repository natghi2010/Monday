import {
  Col,
  Row,
  Container,
  Card,
  Form,
  Table,
  Button,
} from "react-bootstrap";
import { useState } from "react";
import { Save, Search } from "react-bootstrap-icons";
import { useEffect } from "react";
import axios from "axios";

function BoardSearch() {
  // useEffect(() => {
  //   axios
  //     .post("/board/search",{})
  //     .then(res => {
  //      console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <Container className="mt-5 container">
      <Row style={{ width: "88rem" }}>
        <Col md={12} lg={12} xs={12}>
          <div className="border border-3 border-default"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h4>Search Board</h4>
              </div>
              <div className="row">
                <div className="offset-md-9 col-md-3 mt-3">
                  <Form.Control
                    type="text"
                    placeholder="Search by Board Name"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 mt-3">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Board ID</th>
                        <th>Name</th>
                        <th>State</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <Button className="btn btn-primary">
                            <Save /> Save
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default BoardSearch;
