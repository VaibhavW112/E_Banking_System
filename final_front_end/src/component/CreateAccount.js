import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import React, { Component } from "react";
import { Card, Col, Row } from "react-bootstrap";
import CustomerService from "../service/CustomerService";
import HeaderComponent from "./HeaderComponent";

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
      dob: "",
      gender: "",
      mobileNo: "",
      address: "",
      panNo: "",
      aadharNo: "",
      balance: "",
      accType: "",
      message: "",
    };
    this.signUp = this.signUp.bind(this);
  }

  validatePassword() {
    let password = document.getElementById("password").value;
    var regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{5,}$/;

    if (regexPassword.test(password) === true) {
      document.getElementById("passworderr").innerHTML = "";
      return true;
    } else {
      document.getElementById("passworderr").innerHTML =
        "password must be alphanumeric and should contains at least a special character with length 5";
    }
  }

  validateEmail() {
    let email = document.getElementById("email").value;

    var regexEmail = /\S+@\S+\.\S+/;
    if (regexEmail.test(email) === true) {
      document.getElementById("emailerr").innerHTML = "";
      return true;
    } else {
      document.getElementById("emailerr").innerHTML =
        "email format should be 'abc@gmail.com'";
    }
  }
  removeWarnings() {
    document.getElementById("passworderr").innerHTML = "";
    document.getElementById("emailerr").innerHTML = "";
    document.getElementById("mobileNoerr").innerHTML = "";
  }

  validateMobileNumber() {
    let number = document.getElementById("mobileNo").value;
    if (/^\d{10}$/.test(number)) {
      document.getElementById("mobileNoerr").innerHTML = "";
    } else {
      document.getElementById("mobileNoerr").innerHTML =
        "Phone number must be 10 digits.";

      return false;
    }
  }

  signUp = (p) => {
    p.preventDefault();
    let accountData = {
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      password: this.state.password,
      dob: this.state.dob,
      gender: this.state.gender,
      mobileNo: this.state.mobileNo,
      address: this.state.address,
      panNo: this.state.panNo,
      aadharNo: this.state.aadharNo,
      balance: this.state.balance,
      accType: this.state.accType,
    };
    CustomerService.createAccount(accountData)
      .then((res) => {
        console.log(res.data);
        this.setState({ message: "Customer added successfully." });
        console.log(this.state.message);
        alert(this.state.message);
        sessionStorage.setItem("temp_email", this.state.email);
        this.props.history.push("/uploadimage");
      })
      .catch((error) => {
       // console.error("in err ", error.response.data);
        alert("Enter Correct Credentials");
      });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <>
        <HeaderComponent title="E-BANK" />
        <Row className="mt-5">
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="pt-4">
              <Card.Body>
                <div className="container overflow-hidden mb-4">
                  <div className="row">
                    <div className="col-sm-12">
                      <h2 className="text-center">Customer Registration</h2>
                      <hr />
                    </div>
                  </div>
                  <form className="mb-5">
                    <Row>
                      <Col md={6} className="mt-3">
                        <TextField
                          type="text"
                          id="firstName"
                          variant="outlined"
                          className="w-100"
                          label="Enter your first name"
                          name="fname"
                          value={this.state.fname}
                          onChange={this.onChange}
                          required
                        />
                      </Col>
                      <Col md={6} className="mt-3">
                        <TextField
                          type="text"
                          id="lastName"
                          variant="outlined"
                          className="w-100"
                          label="Enter your last name"
                          name="lname"
                          value={this.state.lname}
                          onChange={this.onChange}
                          required
                        />
                      </Col>
                      <Col md={6} className="mt-3">
                        <TextField
                          type="email"
                          id="email"
                          variant="outlined"
                          className="w-100"
                          label="Email"
                          name="email"
                          value={this.state.email}
                          onChange={this.onChange}
                          required
                          onFocus={this.removeWarnings}
                          onBlur={this.validateEmail}
                        />
                        <span style={{ color: "red" }} id="emailerr"></span>
                      </Col>
                      <Col md={6} className="mt-3">
                        <TextField
                          type="password"
                          id="password"
                          variant="outlined"
                          className="w-100"
                          label="Enter Password"
                          name="password"
                          value={this.state.password}
                          onChange={this.onChange}
                          onBlur={this.validatePassword}
                          onFocus={this.removeWarnings}
                          required
                        />
                        <span style={{ color: "red" }} id="passworderr"></span>
                      </Col>
                      <Col md={6} className="mt-3">
                        <TextField
                          type="date"
                          id="dob"
                          variant="outlined"
                          className="w-100"
                          name="dob"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          label="Date of Birth"
                          value={this.state.dob}
                          onChange={this.onChange}
                          required
                        />
                      </Col>
                      <Col md={6} className="mt-3">
                        <RadioGroup
                          row
                          aria-labelledby="demo-radio-buttons-group-label"
                          onChange={this.onChange}
                          name="gender"
                        >
                          <FormControlLabel
                            value="M"
                            control={<Radio />}
                            label="Male"
                          />
                          <FormControlLabel
                            value="F"
                            control={<Radio />}
                            label="Female"
                          />
                        </RadioGroup>
                      </Col>
                      <Col md={6} className="mt-3">
                        <TextField
                          type="text"
                          id="mobileNo"
                          variant="outlined"
                          className="w-100"
                          label="Enter your mobile number"
                          name="mobileNo"
                          value={this.state.mobileNo}
                          onChange={this.onChange}
                          pattern="[0-9]{10}"
                          onBlur={this.validateMobileNumber}
                          onFocus={this.removeWarnings}
                          required
                        />
                        <span id="mobileNoerr" style={{ color: "red" }}></span>
                      </Col>
                      <Col md={6} className="mt-3">
                        <TextField
                          type="text"
                          id="address"
                          variant="outlined"
                          className="w-100"
                          label="Enter your Address"
                          name="address"
                          value={this.state.address}
                          onChange={this.onChange}
                          required
                        />
                      </Col>
                      <Col md={6} className="mt-3">
                        <TextField
                          type="text"
                          id="panNo"
                          variant="outlined"
                          className="w-100"
                          label="Enter a Pan Number "
                          name="panNo"
                          value={this.state.panNo}
                          onChange={this.onChange}
                          required
                        />
                      </Col>
                      <Col md={6} className="mt-3">
                        <TextField
                          type="number"
                          id="aadharNo"
                          variant="outlined"
                          className="w-100"
                          label="Enter Aadhar Number"
                          name="aadharNo"
                          value={this.state.aadharNo}
                          onChange={this.onChange}
                          maxLength="12"
                          required
                        />
                      </Col>
                      <Col md={6} className="mt-3">
                        <TextField
                          type="number"
                          id="balance"
                          variant="outlined"
                          className="w-100"
                          label="Enter Balance Amount"
                          name="balance"
                          value={this.state.balance}
                          onChange={this.onChange}
                          required
                        />
                      </Col>
                      <Col md={6} className="mt-3">
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

                    <div className="form-group row justify-content-center">
                      <div className="offset-1">
                        <button
                          className="btn btn-lg btn-primary text-uppercase mt-3"
                          onClick={this.signUp}
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default CreateAccount;
