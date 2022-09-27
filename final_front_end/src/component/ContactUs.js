import React, { Component } from "react";
import { Card, Col, Row } from "react-bootstrap";
// import UserNavBar from '../components/Navigation'
// import Footer from '../components/Footer'
import "./contactus.css";
import HeaderComponent from "./HeaderComponent";
//import '../App.css'

const ContactUs = () => {
  return (
    <>
      <HeaderComponent title="E-BANK" />
      <Row className="mt-5">
        <Col md={{ offset: 3, span: 3 }}>
          <Card className="bg_grad_1 p-3 ">
            <Card.Img
              class=" contact_us_user mx-auto"
              src="https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-7-avatar-2754582_120519.png"
              alt="User 1 "
            />
            <Card.Body>
              <Card.Title>Kalokhe Rutik R.</Card.Title>
              <Card.Text>Email: rutikkalokhe3@gmail.com </Card.Text>
              <Card.Text>Mobile No. : 9049131938</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="bg_grad_1 p-3">
            <Card.Img
              class=" contact_us_user mx-auto"
              src="https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-7-avatar-2754582_120519.png"
              alt="user 2"
            />
            <Card.Body>
              <Card.Title>Waghmode Pandurang B.</Card.Title>
              <Card.Text>Email: waghmodepb112@gmail.com</Card.Text>
              <Card.Text>Mobile No. : 9096175052</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ContactUs;
