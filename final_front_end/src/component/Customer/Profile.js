import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Card } from "react-bootstrap";
import CustomerService from "../../service/CustomerService";
import maleAvatar from "./../../image/male_avatar.jpeg";
import femaleAvatar from "./../../image/female_avatar.jpeg";
import "./profile.css";
import { TextField } from "@mui/material";
import axios from "axios";



export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      debitCard: "",
      photo:[],
    };
  }

  account = JSON.parse(sessionStorage.getItem("user_dtls"));

  componentDidMount() {

  //   axios.get(`http://localhost:8080/ebanking/auth//${this.account.customer.customerId}/image`)
  // .then(res=>{this.setState({ photo:res.data})});
  
    const isDebitcardRequested = this.account.requestDebitCard;
    const isDebitCardAssigned = this.account.debitCardAssigned;

    console.log(isDebitcardRequested);
    console.log(isDebitCardAssigned);

    if (isDebitcardRequested && isDebitCardAssigned) {
      this.setState({ debitCard: "Already Assigned" });
    } else if (isDebitcardRequested && !isDebitCardAssigned) {
      this.setState({ debitCard: "Already Requested" });
    } else {
      this.setState({ debitCard: "Request Debit Card" });
    }
  }

   showImage=()=>{axios.get(`http://localhost:8080/ebanking/auth//${this.account.customer.customerId}/image`)
  .then(res=>{this.setState({ photo:res.data})})}

  onButtonClick = () => {
    CustomerService.requestDebitCard(this.account.accountId)
      .then((res) => {
        /// CustomerService.moneyTranfer(moneyTranferData).then(res => {
        console.log("got the responce");
        console.log(res.data);
        //  this.setState({response:res.data})
        console.log("here is data " + res.data);
        alert(res.data);
        //  if(res.data==="Request sent succesfully")
        //  this.setState({debitCard:'Already Requested'})

        //  else
        //  this.setState({debitCard:'Already Assigned'})
        // this.props.history.push("/customerhome");
      })
      .catch((error) => {
        //console.error("in err ", error.response.data);
        //alert("Enter Correct Credentials");
        // console.log("got error");
      });
  };

  render() {
    return (
      <div>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Card>
              <Card.Header>
                <h4>Profile</h4>
              </Card.Header>
              <Card.Img
                src={
                `http://localhost:8080/ebanking/auth/${this.account.customer.customerId}/image`
                    ?  `http://localhost:8080/ebanking/auth/${this.account.customer.customerId}/image`
                    : this.account.customer.gender === "M"
                    ? maleAvatar
                    : femaleAvatar
                }
                alt="Customer Img"
                className="voter-image mx-auto my-2"
              ></Card.Img>
              <Card.Body>
                <div className="image-container"></div>
                <h4>Personal Information</h4>
                <hr />
                <Row>
                  <Col md={6} className="mt-3">
                    <TextField
                      type="text"
                      className="w-100"
                      label="First Name"
                      value={this.account.customer.fname}
                      disabled
                    />
                  </Col>
                  <Col md={6} className="mt-3">
                    <TextField
                      type="text"
                      className="w-100"
                      label="Last Name"
                      value={this.account.customer.lname}
                      disabled
                    />
                  </Col>
                  <Col md={6} className="mt-3">
                    <TextField
                      type="text"
                      className="w-100"
                      label="Email"
                      value={this.account.customer.email}
                      disabled
                    />
                  </Col>
                  <Col md={6} className="mt-3">
                    <TextField
                      type="text"
                      className="w-100"
                      label="Mobile Number"
                      value={this.account.customer.mobileNo}
                      disabled
                    />
                  </Col>
                </Row>

                <h4 className="mt-4">Account Details</h4>
                <hr />
                <Row>
                  <Col md={12} className="mt-3">
                    <TextField
                      type="text"
                      className="w-100"
                      label="Account Number"
                      value={this.account.accountId}
                      disabled
                    />
                  </Col>
                  <Col md={6} className="mt-3">
                    <TextField
                      type="text"
                      className="w-100"
                      label="IFSC Code"
                      value={this.account.ifscCode}
                      disabled
                    />
                  </Col>
                  <Col md={6} className="mt-3">
                    <TextField
                      type="text"
                      className="w-100"
                      label="Account Type"
                      value={this.account.accType}
                      disabled
                    />
                  </Col>
                </Row>

                <h4 className="mt-4">Debit Card</h4>
                <hr />
                <div className="mb-3">
                  <input
                    type="button"
                    className="btn btn-success float-left"
                    value={this.state.debitCard}
                    onClick={this.onButtonClick}
                  ></input>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Profile;
