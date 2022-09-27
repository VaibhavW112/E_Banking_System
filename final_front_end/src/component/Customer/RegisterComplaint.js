import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Card } from "react-bootstrap";
import CustomerService from "../../service/CustomerService";

export class RegisterComplaint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complaint: "",
    };

    // this.onRegisterComplaint = this.onRegisterComplaint.bind(this);
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  clearTextBox = () => {
    this.setState({ receiverAccountNo: "" });
    this.setState({ amount: "" });
  };

  onRegisterComplaint = () => {
    const complaintData = { complaint: this.state.complaint };
    console.log("State ==> ", this.state.complaint);
    CustomerService.registerComplaint(
      sessionStorage.getItem("acc_id"),
      complaintData
    )
      .then((res) => {
        /// CustomerService.moneyTranfer(moneyTranferData).then(res => {
        console.log("got the responce");
        console.log(res.data);
        //  this.setState({response:res.data})
        console.log("here is data " + res.data);
        alert(res.data);

        this.setState({ complaint: "" });
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
            <Card style={{ width: "45rem" }}>
              <Card.Header>
                <h4>Register Complaint</h4>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  {/* <label className="form-label">New Mobile Number</label> */}
                  <textarea
                    rows="5"
                    cols="80"
                    name="complaint"
                    form="usrform"
                    placeholder="Enter you complaint here"
                    value={this.state.complaint}
                    onChange={this.onChange}
                  ></textarea>

                  {/* //  className="form-control" */}
                </div>
                <div className="mb-3">
                  <button
                    onClick={this.onRegisterComplaint}
                    className="btn btn-success float-right"
                  >
                    Register Complaint
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

export default RegisterComplaint;
