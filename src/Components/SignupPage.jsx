import React from "react";
import "./styles.css";
import Container from "react-bootstrap/Container";
import Select from "react-select";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import cmichImage from "../Images/login_background.png";

function SignupPage() {
  const options = [
    { value: "STUDENT", label: "STUDENT" },
    { value: "MANAGER", label: "MANAGER" },
  ];
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${cmichImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      >
        <Container fluid alignItems="center" justify="center">
          <Row className="justify-content-center">
            <Col lg={8} sm={5}>
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">Signup Page</Card.Title>
                  <hr />
                  <Form>
                    <Row>
                      <Col xs="6">
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control type="text" placeholder="Enter email" />
                        </Form.Group>
                      </Col>
                      <Col xs="6">
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control type="text" placeholder="Enter email" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6">
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                          <Form.Label>User Name / Email Id</Form.Label>
                          <Form.Control type="text" placeholder="Enter email" />
                        </Form.Group>
                      </Col>
                      <Col xs="6">
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control type="text" placeholder="Enter email" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6">
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                          <Form.Label>Global Id</Form.Label>
                          <Form.Control type="text" placeholder="Enter email" />
                        </Form.Group>
                      </Col>
                      <Col xs="6">
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                          <Form.Label>Student ID</Form.Label>
                          <Form.Control type="text" placeholder="Enter email" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6">
                        <Form.Group
                          className="mb-3"
                          controlId="formGroupPassword"
                        >
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                          />
                        </Form.Group>
                      </Col>
                      <Col xs="6">
                        <Form.Group
                          className="mb-3"
                          controlId="formGroupPassword"
                        >
                          <Form.Label> Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6">
                        {" "}
                        <Form.Group
                          className="mb-3"
                          // controlId="formGroupPassword"
                        >
                          <Form.Label>Role</Form.Label>
                          <Select options={options} />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formHorizontalCheck"
                    >
                      <Col>
                        <Form.Check label="Remember me" />
                      </Col>
                    </Form.Group> */}
                    <Form.Group as={Row} className="mb-3">
                      <Col className="text-center">
                        <Button type="submit">Sign Up</Button>
                      </Col>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default SignupPage;
