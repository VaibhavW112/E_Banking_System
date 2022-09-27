import { TextField } from "@mui/material";
import React, { Component } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import AuthenticationService from "../../service/AuthenticationService";
import CustomerService from "../../service/CustomerService";

export class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldpassword: "",
      newpassword: "",
      confirmnewpassword: "",
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  clearTextBox = () => {
    this.setState({ oldpassword: "" });
    this.setState({ newpassword: "" });
    this.setState({ confirmnewpassword: "" });
  };

  ChangePassword = () => {
    const account = JSON.parse(sessionStorage.getItem("user_dtls"));
    const changePasswordData = {
      newPassword: this.state.newpassword,
      confirmnewpassword: this.state.confirmnewpassword,
      oldPassword: this.state.oldpassword,
    };

    CustomerService.changePassword(
      account.customer.customerId,
      changePasswordData
    )
      .then((res) => {
        /// CustomerService.moneyTranfer(moneyTranferData).then(res => {
        console.log("got the responce");
        console.log(res.data);
        //  this.setState({response:res.data})
        console.log("here is data " + res.data);
        alert(res.data);

        this.clearTextBox();
        //  alert("You Have To Login Again")

        //  AuthenticationService.removeUserDetails();

        //  this.props.history.push("/");
      })
      .catch((error) => {
        //console.error("in err ", error.response.data);
        //alert("Enter Correct Credentials");
        // console.log("got error");
        this.clearTextBox();
      });
  };

  removeWarnings() {
    document.getElementById("passworderr").innerHTML = "";
  }

  validatePassword() {
    let password = document.getElementById("newpassword").value;
    var regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{5,}$/;

    if (regexPassword.test(password) === true) {
      document.getElementById("passworderr").innerHTML = "";
      return true;
    } else {
      document.getElementById("passworderr").innerHTML =
        "password must be alphanumeric and should contains at least a special character with length 5";
    }
  }

  render() {
    return (
      <div>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Card>
              <Card.Header>
                <h4>Change Password</h4>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col className="mt-4" md={12}>
                    <TextField
                      className="w-100"
                      id="oldpassword"
                      name="oldpassword"
                      value={this.state.oldpassword}
                      onChange={this.onChange}
                      type="password"
                      label="Old password"
                    />
                  </Col>
                  <Col className="mt-4" md={12}>
                    <TextField
                      type="password"
                      id="newpassword"
                      className="w-100"
                      label="New Password"
                      name="newpassword"
                      value={this.state.newpassword}
                      onChange={this.onChange}
                      onBlur={this.validatePassword}
                      onFocus={this.removeWarnings}
                      required
                    />
                    <span style={{ color: "red" }} id="passworderr"></span>
                  </Col>

                  <Col className="mt-4" md={12}>
                    <TextField
                      className="w-100"
                      id="confirmnewpassword"
                      name="confirmnewpassword"
                      value={this.state.confirmnewpassword}
                      onChange={this.onChange}
                      type="password"
                      label="Confirm password"
                    />
                  </Col>
                </Row>

                <div className="mb-3 mt-4">
                  <button
                    onClick={this.ChangePassword}
                    className="btn btn-success float-right"
                  >
                    Update Password
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div>
          {/* <button>
              <a className="btn btn-outline-secondary float-left" href="/custhome">
                Profile
              </a>
            </button> */}
        </div>
      </div>
    );
  }
}

export default ChangePassword;
