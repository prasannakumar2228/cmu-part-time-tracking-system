import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./styles.css";
import cmichImage from "../Images/login_background.png";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { postLogin } from "../redux/login";

function LoginPage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.home.isLoading);
  const error = useSelector((state) => state.home.error);

  if (isLoading) {
    return (
      <h1>
        <Spinner animation="grow" />
      </h1>
    );
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { username, password };
    const data = JSON.stringify(userData);
    window.console.log(data);
    dispatch(postLogin(data));
    // window.location.href = "/";
  };

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
          <Row className="justify-content-center" style={{ padding: "100px" }}>
            <Col lg={5} sm={5}>
              <Card className="loginCard">
                <Card.Body>
                  <Card.Title className="text-center loginpageHeading">
                    Login Page
                  </Card.Title>
                  <hr />
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter email"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                      />
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
                        <Button
                          variant="light"
                          style={{ backgroundColor: "#6a0032", color: "#fff" }}
                          type="submit"
                          // onClick={() => handleSignUp()}
                        >
                          Sign in
                        </Button>
                      </Col>
                    </Form.Group>
                  </Form>
                  <Card.Text>
                    New to this Account ?{" "}
                    <Card.Link href="/sign-up" style={{ color: "#6a0032" }}>
                      Sign Up
                    </Card.Link>
                  </Card.Text>
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
