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
import SavedBoards from "../savedBoards";
import Loading from "../../common/Loading";

function BoardSearch() {
  const [boards, setBoards] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const saveBoard = (board) => {
    setIsSubmitting(true);
    axios
      .post("/board/new", board)
      .then((res) => {
        setIsSubmitting(false);
         alert(res.data.message);
      })
      .catch((err) => {
        setIsSubmitting(false);
        console.log(err);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let term = e.target.value;
    if(term.length < 1) return;
    setIsSubmitting(true);
    axios
      .get("/board/?name=" + term)
      .then((res) => {
        setIsSubmitting(false);
        setBoards(res.data.data);
      })
      .catch((err) => {
        setIsSubmitting(false);
        console.log(err);
      });
  };

  return (
    <Container className="mt-5 container">
      <Row style={{ width: "88rem" }}>
        <Col md={12} lg={12} xs={12}>
          <div className="border border-3 border-default"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h4>Search Boards from monday.com</h4>
              </div>
              <div className="row">
                <div className="offset-md-9 col-md-3 mt-3">
                  <Form.Control
                    type="text"
                    placeholder="Search by Board Name"
                    onChange={(e) => {
                      handleSearch(e);
                    }}
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
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {isSubmitting && <tr><td colSpan={4}><Loading/></td></tr>}
                      {!isSubmitting && boards.map((board) => {
                        return (
                          <tr key={board.id}>
                            <td>{board.id}</td>
                            <td>{board.name}</td>
                            <td>{board.state}</td>
                            <td>
                            {isSubmitting && <Loading/>}
                              {!isSubmitting && <Button className="btn btn-primary" onClick={()=>{saveBoard(board)}}>
                                <Save /> Save
                              </Button>}
                            </td>
                          </tr>
                        );
                      })}
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
