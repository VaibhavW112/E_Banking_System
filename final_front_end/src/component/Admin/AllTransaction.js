import { TextField } from "@mui/material";
import React, { Component } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import AdminService from "../../service/AdminService";

export class AllTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      searcharr: [],
      searchtext: "",
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    // console.log(this.state.searchtext)
    //if flag is true means the data is deleted from mongodb so call getemeployee from EmployeeService again
    if (this.state.flag) {
      AdminService.fetchAllTransactions().then((res) => {
        this.setState({ response: res.data, searcharr: res.data, flag: false });
      });
    }
    //this code will be executed every time we change the value of searchtext
    //when searchteex changes then filter emparr aray
    //if searchtext is empty then searcharr and emparr are same
    //otherwise searcharr will contain only values that matches with search texrt
    if (prevState.searchtext !== this.state.searchtext) {
      console.log(
        "in change searchtext ----" +
          prevState.searchtext +
          "----$$$$--" +
          this.state.searchtext
      );
      //if searchtext is not empty then it will find all employee whose name contains
      // the searchtext otherwise searcharr and emparr will be same
      if (this.state.searchtext !== "") {
        this.setState({
          searcharr: this.state.response.filter((acc) => {
            console.log(typeof this.state.searchtext);
            return acc.account.accountId === parseInt(this.state.searchtext);
          }),
        });
      } else {
        this.setState({ searcharr: this.state.response });
      }
    }
  };

  searchCustomer = () => {
    if (this.state.searchtext !== "") {
      this.setState({
        searcharr: this.state.response.filter((acc) => {
          return acc.account.accountId === parseInt(this.state.searchtext);
        }),
      });
    } else {
      this.setState({ searcharr: this.state.response });
    }
  };

  componentDidMount = () => {
    AdminService.fetchAllTransactions()
      .then((res) => {
        console.log("got the responce");
        console.log(res.data);
        this.setState({ response: res.data, searcharr: res.data });
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
      <Card className={"border border-dark "}>
        <Card.Header>
          <h4>Transaction History</h4>
        </Card.Header>
        <Card.Body>
          <div>
            <Row className="mb-3 bt-3">
              <Col md={12}>
                <TextField
                  type="text"
                  name="search"
                  label="Search By Account id"
                  value={this.state.searchtext}
                  onChange={(event) =>
                    this.setState({ searchtext: event.target.value })
                  }
                />
              </Col>
            </Row>
            <Table bordered hover striped>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Sender Account No</th>
                  <th>Transaction Amount</th>
                  <th>Beneficiery Account No</th>
                  <th>Transaction Status</th>
                </tr>
              </thead>
              <tbody>
                {this.state.searcharr &&
                  this.state.searcharr.length > 0 &&
                  this.state.searcharr.map((list) => {
                    return (
                      <tr>
                        <td>{list.date}</td>
                        <td>{list.account.accountId}</td>
                        <td>{list.amount}</td>
                        <td>{list.receiverAccNo}</td>
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

export default AllTransaction;
