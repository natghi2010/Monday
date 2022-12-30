import {
  Col,
  Row,
  Container,
  Card,
  Form,
  Table,
  Button,
  Spinner,
  Badge,
} from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Loading from "../../common/Loading";
import Filters from "./components/filters";
import * as moment from 'moment';

function SavedBoards() {
  const [boards, setBoards] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);

  const searchSavedBoards = (filters) => {
    filters = removeEmptyFilters(filters);

    setLoading(true);
    axios
      .post("/board/search", filters)
      .then((res) => {
        setBoards(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const removeEmptyFilters = (filters) => {
    const newFilters = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key] !== "") {
        newFilters[key] = filters[key];
      }
    });
    return newFilters;
  };

  useEffect(() => {
    searchSavedBoards(filters);
  }, [filters]);

  return (
    <Container className="mt-5 container">
      <Row style={{ width: "88rem" }}>
        <Col md={12} lg={12} xs={12}>
          <div className="border border-3 border-default"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h4>Search Saved Board ({boards.length})</h4>
                {JSON.stringify(filters)}
              </div>

              <div className="row">
                <Filters filters={filters} setFilter={setFilters} />
              </div>

              <div className="row">
                <div className="col-md-12 mt-3">
                  {
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Board ID</th>
                          <th>Name</th>
                          <th>State</th>
                          <th>Created</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!loading && boards.length === 0 && (
                          <tr>
                            <td colSpan="4" className="text-center">
                              No Saved Boards Found
                            </td>
                          </tr>
                        )}

                        {loading && (
                          <tr>
                            <td colSpan="4" className="text-center">
                              <Spinner />
                            </td>
                          </tr>
                        )}
                        {boards.map((board, index) => (
                          <tr key={index} className="text-center  ">
                            <td>{board.id}</td>
                            <td>{board.name}</td>
                            <td><Badge bg={board.state == 'active' ? 'success': 'danger'}>{board.state}</Badge></td>
                            <td>{board.timestamp}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  }
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SavedBoards;
