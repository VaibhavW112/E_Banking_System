//import "../../App.css"
import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthenticationService from "../service/AuthenticationService";
import { NavLink } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import brandLogo from "./../image/bank_logo.png";
import HeaderComponent from "./HeaderComponent";
class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      accType: "",
    };

    this.authenticateUser = this.authenticateUser.bind(this);
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  authenticateUser = (e) => {
    e.preventDefault();
    let loginRequest = {
      email: this.state.email,
      password: this.state.password,
      accType: this.state.accType,
    };
    AuthenticationService.authenticateUser(
      loginRequest.email,
      loginRequest.password,
      loginRequest.accType
    )
      .then((res) => {
        // console.log(res.data);
        console.log(res.data.accs.customer.email);
        console.log(res.data.accs);
        this.setState({
          email: res.data.accs.customer.email,
        });

        alert("User Login successfully By " + this.state.email);
        // user != null && this.setState({message : 'User Login successfully.'});

        AuthenticationService.storeUserDetails(this.state.email, res.data.jwt);
        AuthenticationService.storeUserAccounts(JSON.stringify(res.data.accs));
        AuthenticationService.storeAccountId(res.data.accs.accountId);
        // console.log(AuthenticationService.getAccounts())
        this.props.history.push("/customerhome");
      })
      .catch((error) => {
        //console.error("in err ", error.response.data);
        alert("Login Credentials are wrong");
        // alert(error.response.data.message);
      });
  };

  render() {
    return (
      <>
        <HeaderComponent title="E-BANK" />
        <Row className="mt-5">
          <Col md={{ offset: 4, span: 4 }}>
            <Card>
              <Card.Img
                src={brandLogo}
                alt="bank logo"
                className="bank_logo mx-auto"
              />
              <Card.Body>
                <h2 className="text-center mt-2 mb-4">Customer Login</h2>
                <form className="container pt-2">
                  <TextField
                    id="email"
                    type="email"
                    variant="outlined"
                    label="Email"
                    className="w-100"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    onBlur={this.validateEmail}
                    onFocus={this.removeAlert}
                    required
                  />
                  <span style={{ color: "red" }} id="emailVR"></span>
                  <div className="form-group my-3">
                    <TextField
                      type="password"
                      name="password"
                      className="w-100"
                      label="Password"
                      value={this.state.password}
                      onChange={this.onChange}
                      required
                    />
                  </div>
                  <Row>
                    <Col>
                      <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        onChange={this.onChange}
                        name="accType"
                      >
                        <FormControlLabel
                          value="SAVINGS"
                          control={<Radio />}
                          label="Saving"
                        />
                        <FormControlLabel
                          value="CURRENT"
                          control={<Radio />}
                          label="Current"
                        />
                      </RadioGroup>
                    </Col>
                  </Row>
                  <div className="row my-3">
                    <div className="col-sm-7">
                      <button
                        className="btn btn-success text-uppercase mb-3 offset-8"
                        onClick={this.authenticateUser}
                      >
                        LOGIN
                      </button>
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-sm-5 mt-6">
                      <NavLink className="" to="/forgotpassword">
                        <h6>Forgot Password?</h6>
                      </NavLink>
                    </div>{" "}
                    <div className="col-sm-5 mt-6">
                      <NavLink className="" to="/createaccount">
                        <h6>Sign Up</h6>
                      </NavLink>
                    </div>
                    <Col md={12}>
                      <NavLink
                        className={"text-center w-100"}
                        to="/openanotheraccount"
                      >
                        Already a Customer Open Another Account
                      </NavLink>
                    </Col>
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
export default Welcome;
