import React, { Component } from "react";
import { Card, Table } from "react-bootstrap";
import AdminService from "../../service/AdminService";

export class DebitCardRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
    };
  }

  componentDidMount = () => {
    AdminService.fetchAllDebitCardRequest()
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

  onApprove = (accountId) => {
    AdminService.approveCardRequest(accountId).then(
      (response) => {
        console.log(response);
        //  this.componentDidMount();
        this.componentDidMount();
      },
      (error) => {
        console.log("Not Approved");
      }
    );
  };

  onDelete = (accId) => {
    AdminService.deleteCardRequest(accId).then(
      (response) => {
        console.log(response);
        this.componentDidMount();
      },
      (error) => {
        console.log("Not deleted");
      }
    );
  };

  render() {
    return (
      <Card className={"border border-dark "}>
        <Card.Header>
          <h4>Debit Card Requests</h4>
        </Card.Header>
        <Card.Body>
          <div>
            <Table bordered hover striped>
              <thead>
                <tr>
                  <th>Account No</th>
                  <th>Customer Name</th>
                  <th>Email id</th>
                  <th>Mobile No</th>
                  <th>Approve</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.response &&
                  this.state.response.length > 0 &&
                  this.state.response.map((list) => {
                    return (
                      <tr>
                        <td>{list.accountId}</td>
                        <td>{list.customer.fname}</td>
                        <td>{list.customer.email}</td>
                        <td>{list.customer.mobileNo}</td>
                        <td>
                          <button
                            size="md"
                            type="button"
                            class="btn  btn-success"
                            onClick={() => {
                              this.onApprove(list.accountId);
                            }}
                          >
                            Approve
                          </button>
                        </td>
                        <td>
                          <button
                            size="md"
                            type="button"
                            class="btn btn-danger"
                            onClick={() => {
                              this.onDelete(list.accountId);
                            }}
                          >
                            DELETE
                          </button>
                        </td>
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

export default DebitCardRequests;
