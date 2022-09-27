import React, { Component } from "react";
import { Card, Table } from "react-bootstrap";
import AdminService from "../../service/AdminService";
import maleAvatar from "./../../image/male_avatar.jpeg";
import femaleAvatar from "./../../image/female_avatar.jpeg";

export class PendingCustomers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      searcharr: [],
    };
  }

  componentDidMount = () => {
    AdminService.getAllCustomerRequest()
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
    AdminService.approveCustomer(accountId).then(
      (response) => {
        console.log(response);
        this.componentDidMount();
      },
      (error) => {
        console.log("Not Approved");
      }
    );
  };

  onDelete = (accId) => {
    AdminService.rejectCustomer(accId).then(
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
      <Card className={"border border-dark"}>
        <Card.Header>
          <h4>All pending Requests</h4>
        </Card.Header>
        <Card.Body>
          <div>
            <Table bordered hover striped>
              <thead>
                <tr>
                  <th>Profile Photo</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email id</th>
                  <th>Account Type</th>
                  <th>Opening Balance</th>
                  <th>Approve</th>
                  <th>Reject</th>
                </tr>
              </thead>
              <tbody>
                {this.state.response &&
                  this.state.response.length > 0 &&
                  this.state.response.map((list) => {
                    return (
                      <tr>
                        <td>
                          {" "}
                          <img
                            src={`http://localhost:8080/ebanking/auth/${list.customer.customerId}/image`}
                            className="profile_img"
                            alt="Profile Img"
                          />
                        </td>

                        <td>{list.customer.fname}</td>
                        <td>{list.customer.lname}</td>
                        <td>{list.customer.email}</td>
                        <td>{list.accType}</td>
                        <td>{list.balance}</td>
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
                            REJECT
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

export default PendingCustomers;
