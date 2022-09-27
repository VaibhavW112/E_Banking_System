import { TextField } from "@mui/material";
import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Card } from "react-bootstrap";
import CustomerService from "../../service/CustomerService";

export class MoneyTransfer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      senderAccountNo: "",
      receiverAccountNo: "",
      amount: "",
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  clearTextBox = () => {
    this.setState({ senderAccountNo: "" });
    this.setState({ receiverAccountNo: "" });
    this.setState({ amount: "" });
  };

  onTransfer = () => {
    const moneyTranferData = {
      senderAccountNo: sessionStorage.getItem("acc_id"),
      receiverAccountNo: this.state.receiverAccountNo,
      amount: this.state.amount,
    };
    console.log(this.state.receiverAccountNo);

    CustomerService.moneyTranfer(moneyTranferData)
      .then((res) => {
        console.log("got the responce");
        console.log(res.data);
        //  this.setState({response:res.data})
        console.log("here is data " + res.data);
        alert(res.data);

        this.clearTextBox();
      })
      .catch((error) => {
        //console.error("in err ", error.response.data);
        //alert("Enter Correct Credentials");
        console.log("got error");
        this.clearTextBox();
      });
  };

  render() {
    return (
      <div>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Card style={{ width: "35rem" }}>
              <Card.Header>
                <h4>Money Transfer</h4>
              </Card.Header>
              <Card.Body>
                <TextField
                  type="number"
                  id="receiverAccountNo"
                  name="receiverAccountNo"
                  className="w-100 mt-3"
                  value={this.state.receiverAccountNo}
                  onChange={this.onChange}
                  label="Beneficiary Account Number"
                />

                <TextField
                  type="number"
                  id="amount"
                  name="amount"
                  className="w-100 mt-4"
                  value={this.state.amount}
                  onChange={this.onChange}
                  label="Amount"
                />

                <div className="mb-3 mt-4">
                  <button
                    onClick={this.onTransfer}
                    className="btn btn-success float-right"
                  >
                    Transfer
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MoneyTransfer;
