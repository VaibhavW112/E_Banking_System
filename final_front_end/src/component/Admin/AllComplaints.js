import React, { Component } from "react";
import { Card, Table } from "react-bootstrap";
import AdminService from "../../service/AdminService";

export class AllComplaints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
    };
  }

  componentDidMount = () => {
    AdminService.fetchAllComplaints()
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
      <Card className={"border border-dark "}>
        <Card.Header>
          <h4>All Complaints</h4>
        </Card.Header>
        <Card.Body>
          <div>
            <Table bordered hover striped>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Account No</th>
                  <th>Customer Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {this.state.response &&
                  this.state.response.length > 0 &&
                  this.state.response.map((list) => {
                    return (
                      <tr>
                        <td>{list.date}</td>
                        <td>{list.account.accountId}</td>
                        <td>{list.account.customer.fname}</td>
                        <td>{list.description}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default AllComplaints;
