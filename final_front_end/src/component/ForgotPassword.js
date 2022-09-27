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
class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    let forgotpassworddata = {
      email: this.state.email,
    };

    alert("wait until response");
    AuthenticationService.forgotpassword(
     forgotpassworddata.email
    )
      .then((res) => {
        // console.log(res.data);
        console.log(res.data);
      

        alert(res.data);
        // user != null && this.setState({message : 'User Login successfully.'});

        this.props.history.push("/");
      })
      .catch((error) => {
        //console.error("in err ", error.response.data);
        alert("wrong email");
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
                <h2 className="text-center mt-2 mb-4">Forgot Password</h2>
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
                 
                  <div className="row my-3">
                    <div className="col-sm-7">
                      <button
                        className="btn btn-success text-uppercase mb-3 offset-8"
                        onClick={this.onSubmit}
                      >
                        Submit
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
export default ForgotPassword;
