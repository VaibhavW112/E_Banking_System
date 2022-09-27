import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Card } from "react-bootstrap";
import CustomerService from "../../service/CustomerService";

export class AccountBalance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: "",
    };
  }

  componentDidMount() {
    CustomerService.accountBalance(sessionStorage.getItem("acc_id"))
      .then((res) => {
        console.log("got the responce");
        console.log(res.data);
        //  this.setState({response:res.data})
        console.log("here is data " + res.data);
        this.setState({ balance: res.data });
      })
      .catch((error) => {
        //console.error("in err ", error.response.data);
        //alert("Enter Correct Credentials");
        console.log("got error");
      });
  }
  render() {
    return (
      <div>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="bg_grad_1">
              <Card.Header>
                <h4 className="text-white">Account Balance</h4>
              </Card.Header>
              <Card.Body>
                <h5>Your Account Balance : ₹ {this.state.balance} </h5>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AccountBalance;
