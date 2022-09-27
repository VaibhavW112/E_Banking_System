import React, { Component } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import CustomerService from "../../service/CustomerService";

export class ComplaintHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
    };
  }

  componentDidMount = () => {
    CustomerService.getAllComplaints(
      JSON.parse(sessionStorage.getItem("acc_id"))
    )
      .then((res) => {
        console.log("got the responce");
        console.log(res.data);
        this.setState({ response: res.data });
        console.log("here is data " + this.state.response);
      })
      .catch((error) => {
        //console.error("in err ", error.response.data);
        //alert("Enter Correct Credentials");
        console.log("got error");
      });
  };
  render() {
    return (
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h4>Complaints History</h4>
            </Card.Header>
            <Card.Body>
              <div>
                <Table bordered hover striped>
                  <thead>
                    <tr>
                      <th>Complaint Id</th>
                      <th>Date</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.response &&
                      this.state.response.length > 0 &&
                      this.state.response.map((list) => {
                        return (
                          <tr>
                            <td>{list.complaintId}</td>
                            <td>{list.date}</td>
                            <td>{list.description}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default ComplaintHistory;
