import React from "react";
import "./styles.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import logo from "../Images/cmich_logo.png";
import { Card, Col, Row, Form } from "react-bootstrap";

function PostJob() {
  return (
    <>
      <Navbar className="nav-background">
        <Container>
          <Navbar.Brand to="/" as={Link}>
            <img src={logo} alt="logo" height={50} width={250} />
          </Navbar.Brand>{" "}
        </Container>
      </Navbar>
      <Container fluid className="p-5">
        <Card>
          <Card.Header>
            <b>Post Job Form</b>
          </Card.Header>
          <Card.Body>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Department Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Department Name"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Job Type</Form.Label>
                  <Form.Control type="text" placeholder="Enter Job Type" />
                </Form.Group>
              </Row>
              <Row>
                <Col xs="6">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Job Description</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                </Col>
                <Col xs="6">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Location</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Job Created Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter Department Name"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Last Date for Apply</Form.Label>
                  <Form.Control type="date" placeholder="Enter Job Type" />
                </Form.Group>
              </Row>
              <Row>
                <Col xs="6">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Required Qualification</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                </Col>
                <Col xs="6">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Desired Qualification</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs="6">
                  {" "}
                  <Form.Group
                    as={Col}
                    controlId="formGridEmail"
                    style={{ display: "flex" }}
                  >
                    <Form.Label>
                      Do You Have Any Relevant Experience:{" "}
                    </Form.Label>{" "}
                    <Form.Check
                      style={{ width: "auto", marginLeft: "2rem" }}
                      type="radio"
                      label="YES"
                      name="formHorizontalRadios"
                      id="formHorizontalRadios1"
                    />
                    <Form.Check
                      style={{ width: "auto", marginLeft: "2rem" }}
                      type="radio"
                      label="NO"
                      name="formHorizontalRadios"
                      id="formHorizontalRadios2"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="text-center mt-5">
                <Col>
                  <Button variant="secondary" style={{ marginRight: "1rem" }}>
                    Close
                  </Button>{" "}
                  <Button
                    variant="light"
                    style={{ backgroundColor: "#6a0032", color: "#fff" }}
                  >
                    Save
                  </Button>{" "}
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default PostJob;
