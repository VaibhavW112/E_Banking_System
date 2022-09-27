import React, { Component } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import AdminService from "../../service/AdminService";
import AuthenticationService from "../../service/AuthenticationService";
import maleAvatar from "./../../image/male_avatar.jpeg";
import femaleAvatar from "./../../image/female_avatar.jpeg";
import { TextField } from "@mui/material";

export class ActiveCustomers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      searcharr: [],
      searchtext: "",
    };
  }

  componentWillUnmount = () => {
    if (AuthenticationService.isUserLoggedIn === false) {
      alert("Login First!!!!!!!!!!!");
      this.props.history.push("/");
    }
  };

  onTerminate = (customerId) => {
    AdminService.deleteCustomer(customerId).then(
      (response) => {
        console.log(response);
        this.componentDidMount();
      },
      (error) => {
        console.log("Not Terminated");
      }
    );
  };

  componentDidUpdate = (prevProps, prevState) => {
    // console.log(this.state.searchtext)
    //if flag is true means the data is deleted from mongodb so call getemeployee from EmployeeService again
    if (this.state.flag) {
      AdminService.getAllActiveCustomers().then((res) => {
        this.setState({ response: res.data, searcharr: res.data, flag: false });
      });
    }
    //this code will be executed every time we change the value of searchtext
    //when searchteex changes then filter emparr aray
    //if searchtext is empty then searcharr and emparr are same
    //otherwise searcharr will contain only values that matches with search texrt
    if (prevState.searchtext !== this.state.searchtext) {
      console.log(
        "in change searchtext ----" +
          prevState.searchtext +
          "----$$$$--" +
          this.state.searchtext
      );
      //if searchtext is not empty then it will find all employee whose name contains
      // the searchtext otherwise searcharr and emparr will be same
      if (this.state.searchtext !== "") {
        this.setState({
          searcharr: this.state.response.filter((acc) => {
            console.log(typeof this.state.searchtext);
            return acc.accountId === parseInt(this.state.searchtext);
          }),
        });
      } else {
        this.setState({ searcharr: this.state.response });
      }
    }
  };

  searchCustomer = () => {
    if (this.state.searchtext !== "") {
      this.setState({
        searcharr: this.state.response.filter((acc) => {
          return acc.accountId === parseInt(this.state.searchtext);
        }),
      });
    } else {
      this.setState({ searcharr: this.state.response });
    }
  };

  componentDidMount = () => {
    AdminService.getAllActiveCustomers()
      .then((res) => {
        console.log("got the responce");
        console.log(res.data);
        this.setState({ response: res.data, searcharr: res.data });
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
          <h4>All Customers</h4>
        </Card.Header>
        <Card.Body>
          <div>
            <Row className="mb-3 bt-3">
              <Col md={12}>
                <TextField
                  type="text"
                  name="search"
                  label="Search By Account id"
                  value={this.state.searchtext}
                  onChange={(event) =>
                    this.setState({ searchtext: event.target.value })
                  }
                />
              </Col>
            </Row>

            <Table bordered hover striped>
              <thead>
                <tr>
                  <th>Profile Photo</th>
                  <th>Account id</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email id</th>
                  <th>Mobile No</th>
                  <th>Account Type</th>
                  <th>Gender</th>
                  <th>Terminate</th>
                </tr>
              </thead>
              <tbody>
                {this.state.searcharr &&
                  this.state.searcharr.length > 0 &&
                  this.state.searcharr.map((list) => {
                    return (
                      <tr>
                        <td>
                          <img
                            src={
                              `http://localhost:8080/ebanking/auth/${list.customer.customerId}/image`
                                ? `http://localhost:8080/ebanking/auth/${list.customer.customerId}/image`
                                : this.account.customer.gender === "M"
                                ? maleAvatar
                                : femaleAvatar
                            }
                            className="profile_img"
                            alt="Profile Img"
                          />
                        </td>
                        <td>{list.accountId}</td>
                        <td>{list.customer.fname}</td>
                        <td>{list.customer.lname}</td>
                        <td>{list.customer.email}</td>
                        <td>{list.customer.mobileNo}</td>
                        <td>{list.accType}</td>
                        <td>
                          {list.customer.gender === "M" ? "Male" : "Female"}
                        </td>
                        <td>
                          <button
                            size="md"
                            type="button"
                            class="btn  btn-danger"
                            onClick={() => {
                              this.onTerminate(list.customer.customerId);
                            }}
                          >
                            Terminate
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

export default ActiveCustomers;
