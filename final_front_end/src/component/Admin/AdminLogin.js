//import "../../App.css"
import { TextField } from "@mui/material";
import React, { Component } from "react";
import { Card, Col, Row } from "react-bootstrap";
import brandLogo from "./../../image/bank_logo.png";
import AuthenticationService from "../../service/AuthenticationService";
import HeaderComponent from "../HeaderComponent";

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.authenticateAdmin = this.authenticateAdmin.bind(this);
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  authenticateAdmin = (e) => {
    e.preventDefault();
    let loginRequest = {
      email: this.state.email,
      password: this.state.password,
    };
    AuthenticationService.authenticateAdmin(
      loginRequest.email,
      loginRequest.password
    )
      .then((res) => {
        console.log(res.data);

        AuthenticationService.storeUserDetails(this.state.email, res.data.jwt);
        this.props.history.push("/adminhome");
      })
      .catch((error) => {
        //console.error("in err ", error.response.data);
        alert("Login Credentials are wrong");
        // alert(error.response.data.message);
        document.getElementById("email").innerHTML = "";
        document.getElementById("password").innerHTML = "";
      });
  };

  render() {
    return (
      <>
        <HeaderComponent title="E-BANK" />
        <Row className=" mt-5">
          <Col md={{ span: 4, offset: 4 }}>
            <Card>
            <Card.Img
                src={brandLogo}
                alt="bank logo"
                className="bank_logo mx-auto"
              />
              <Card.Body>
                <h2 className="text-center ">Admin Login</h2>
                <form className="container pt-2" style={{ width: "30vw" }}>
                  <TextField
                    id="email"
                    type="email"
                    className="w-100 mt-3"
                    variant="outlined"
                    label="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    onBlur={this.validateEmail}
                    onFocus={this.removeAlert}
                    required
                  />
                  <span style={{ color: "red" }} id="emailVR"></span>

                  <TextField
                    type="password"
                    id="password"
                    variant="outlined"
                    className="w-100 mt-3"
                    name="password"
                    label="Password"
                    value={this.state.password}
                    onChange={this.onChange}
                    required
                  />
                  <div className="row my-3">
                    <div className="col-sm-7">
                      <button
                        className="btn btn-success text-uppercase mb-3 offset-8"
                        onClick={this.authenticateAdmin}
                      >
                        LOGIN
                      </button>
                    </div>
                  </div>
                </form>
                <span id="span"></span>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
export default AdminLogin;
