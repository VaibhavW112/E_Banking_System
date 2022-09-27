import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import React, { Component } from "react";
import { Card, Col, Row } from "react-bootstrap";
import CustomerService from "../service/CustomerService";
import HeaderComponent from "./HeaderComponent";

export class OpenAnotherAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      balance: "",
      accType: "",
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  validateEmail = () => {
    let email = document.getElementById("email").value;

    var regexEmail = /\S+@\S+\.\S+/;
    if (regexEmail.test(email) === true) {
      document.getElementById("emailerr").innerHTML = "";
      return true;
    } else {
      document.getElementById("emailerr").innerHTML =
        "Email format should be 'abc@gmail.com'<br/>Email should be same as registered email";
    }
  };

  createaccount = (e) => {
    e.preventDefault();
    let accountData = {
      email: this.state.email,
      balance: this.state.balance,
      accType: this.state.accType,
    };
    CustomerService.createAnotherAccount(accountData)
      .then((res) => {
        //   console.log(res.data);
        alert("Account Created Succesfully");
        this.props.history.push("/");
      })
      .catch((error) => {
        console.error("in err ", error.response.data);
        if (error.response.status === 400) {
          alert("You Already have account with this Account Type ");
        }
        if (error.response.status === 500)
          alert("Enter Correct Registered Email");

        this.setState({ email: "" });
        this.setState({ balance: "" });
        this.setState({ accType: "" });
      });
  };

  render() {
    return (
      <>
        <HeaderComponent title="E-BANK" />;
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Card>
              <Card.Header>
                <h4>Account Registration</h4>
              </Card.Header>
              <Card.Body>
                <form className="mb-5">
                  <Row>
                    <Col md={12} className="mt-3">
                      <TextField
                        fullWidth
                        type="email"
                        id="email"
                        label="Registered Email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        required
                        onFocus={this.removeWarnings}
                        onBlur={this.validateEmail}
                      />
                      <span style={{ color: "red" }} id="emailerr"></span>
                    </Col>
                    <Col md={12} className="mt-3">
                      <TextField
                        fullWidth
                        type="number"
                        id="balance"
                        label="Account Balance"
                        name="balance"
                        value={this.state.balance}
                        onChange={this.onChange}
                        required
                      />
                    </Col>
                  </Row>
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

                  <div className="form-group row justify-content-center">
                    <div className="offset-1">
                      <button
                        className="btn btn-lg btn-primary text-uppercase mt-3"
                        onClick={this.createaccount}
                      >
                        Create Account
                      </button>
                    </div>
                  </div>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default OpenAnotherAccount;
