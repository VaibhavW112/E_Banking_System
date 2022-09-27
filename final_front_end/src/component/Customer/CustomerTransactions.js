import React, { Component } from "react";
import { Card, Table } from "react-bootstrap";
import CustomerService from "../../service/CustomerService";

export class CustomerTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
    };
  }

  componentDidMount = () => {
    CustomerService.getAllTransactions(
      JSON.parse(sessionStorage.getItem("acc_id"))
    )
      .then((res) => {
        console.log("got the responce");
        console.log(res.data);
        this.setState({ response: res.data });
        console.log("here is data " + this.state.response);
      })
      .catch((error) => {
        //console.error("in err ", error.response.data);
        //alert("Enter Correct Credentials");
        console.log("got error");
      });
  };
  render() {
    return (
      <Card>
        <Card.Header>
          <h4>Transaction History </h4>
        </Card.Header>
        <Card.Body>
          <div>
            <Table bordered hover striped>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Partner Account No</th>
                  <th>Transaction Amount</th>
                  <th>Transaction Type</th>
                  <th>Transaction Status</th>
                </tr>
              </thead>
              <tbody>
                {this.state.response &&
                  this.state.response.length > 0 &&
                  this.state.response.map((list) => {
                    return (
                      <tr>
                        <td>{list.date}</td>
                        <td>{list.receiverAccNo}</td>
                        <td>{list.amount}</td>
                        <td>{list.txType}</td>
                        <td>Success</td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default CustomerTransactions;
