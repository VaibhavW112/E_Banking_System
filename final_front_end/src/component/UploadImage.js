import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import React, { Component } from "react";
import { Card, Col, Row } from "react-bootstrap";
import CustomerService from "../service/CustomerService";
import HeaderComponent from "./HeaderComponent";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pancard: "",
      photo: "",
    };
  }

  email = sessionStorage.getItem("temp_email");

  onChange1 = (e) => this.setState({ pancard: e.target.files[0] });

  onChange2 = (e) => this.setState({ photo: e.target.files[0] });

  uploadFiles = () => {
    const formData = new FormData();
    formData.append("panCopy", this.state.pancard);
    formData.append("profilePhoto", this.state.photo);

    console.log(this.email);
    console.log(this.state.pancard);
    console.log(this.state.photo);

    axios
      .post(
        `http://localhost:8080/ebanking/auth/${this.email}/images`,
        formData,
        {
          headers: {
            "Content-type":
              "multipart/form-data;boundary=<calculated when request is sent>",
          },
        }
      )
      .then((res) => {
        alert("images Uplaoded Succesfully");
        sessionStorage.removeItem("temp_email");
      });
    this.props.history
      .push("/")

      .catch((err) => alert("error"));
  };
  render() {
    return (
      <>
        <HeaderComponent title="E-BANK" />;
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Card>
              <Card.Header>
                <h4>File Upload</h4>
              </Card.Header>
              <Card.Body>
                <form className="mb-3">
                  <Row>
                    <Col md={12} className="mt-2">
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                        type="file"
                        id="pancard"
                        label="Pan Card"
                        name="pancard"
                        // value={this.state.pancard}
                        onChange={this.onChange1}
                        required
                      />
                    </Col>
                    <Col md={12} className="mt-3">
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        fullWidth
                        type="file"
                        id="photo"
                        label="Profile Photo"
                        name="photo"
                        //value={this.state.photo}
                        onChange={this.onChange2}
                        required
                      />
                    </Col>
                  </Row>

                  <div className="form-group row justify-content-center">
                    <div>
                      <button
                        className="btn btn-lg btn-primary text-uppercase mt-3"
                        onClick={this.uploadFiles}
                      >
                        Upload
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

export default UploadImage;
