import React from "react";
import Container from "react-bootstrap/Container";
import Select from "react-select";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./styles.css";
import cmichImage from "../Images/login_background.png";
import cmulogo from "../Images/central_logo.png";
import { CardBody } from "react-bootstrap";

function LoginPage() {
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
        <Container fluid alignItems="center" justify="center"
        >
          <Row className="justify-content-center">
            <Col lg={5} sm={5}>
              <Card>
                <Card.Body>
                  <Card.Title className="text-center">Login Page</Card.Title>
                  <hr />
                  <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      // controlId="formGroupPassword"
                    >
                      <Form.Label>Role</Form.Label>
                      <Select options={options} />
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formHorizontalCheck"
                    >
                      <Col>
                        <Form.Check label="Remember me" />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                      <Col className="text-center">
                        <Button type="submit">Sign in</Button>
                      </Col>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        {/* <Card className="loginCard">
          <Card.Body>
            <Row>
              <Col xs="6">
                <img
                  src={cmulogo}
                  alt="CMU Logo"
                  height={150}
                  width={150}
                  className="align-items-center justify-content-center"
                />
              </Col>
              <Col xs="6">
                <Row className="justify-content-center my-5">
                  <Col>
                    <Card>
                      <Card.Body>
                        <Card.Title className="justify-content-center text-center">
                          Login Page
                        </Card.Title>
                        <hr />
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="formGroupEmail"
                          >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Enter email"
                            />
                          </Form.Group>
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
                          <Form.Group
                            className="mb-3"
                            // controlId="formGroupPassword"
                          >
                            <Form.Label>Role</Form.Label>
                            <Select options={options} />
                          </Form.Group>
                          <Form.Group
                            as={Row}
                            className="mb-3"
                            controlId="formHorizontalCheck"
                          >
                            <Col sm={{ span: 11, offset: 1 }}>
                              <Form.Check label="Remember me" />
                            </Col>
                          </Form.Group>
                          <Form.Group as={Row} className="mb-3">
                            <Col sm={{ span: 11, offset: 1 }}>
                              <Button type="submit">Sign in</Button>
                            </Col>
                          </Form.Group>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card> */}

        {/* <img src={cmichImage} className="central_logo" alt="img" height={400} width={400} /> */}
        {/* <Image src={cmichImage} roundedCircle height={400} width={400} /> */}

        {/* <Row className="justify-content-center my-5">
                <Col>
                  <Card>
                    <Card.Body>
                        
                      <Card.Title className="justify-content-center text-center">
                        Login Page
                      </Card.Title>
                      <hr />
                      <Form>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter email"
                          />
                        </Form.Group>
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
                        <Form.Group
                          as={Row}
                          className="mb-3"
                          controlId="formHorizontalCheck"
                        >
                          <Col sm={{ span: 11, offset: 1 }}>
                            <Form.Check label="Remember me" />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                          <Col sm={{ span: 11, offset: 1 }}>
                            <Button type="submit">Sign in</Button>
                          </Col>
                        </Form.Group>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row> */}
      </div>
    </>
  );
}

export default LoginPage;
