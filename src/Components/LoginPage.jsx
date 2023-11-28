/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./styles.css";
import cmichImage from "../Images/login_background.png";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { postLogin } from "../redux/login";

function LoginPage() {
  const history = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login successful!", response.data);
      if (response?.data?.role === "Student") {
        history("/student-homepage");
      }
      if (response?.data?.role === "Manager") {
        history("/manager-homepage");
      }
    } catch (error) {
      console.error("Login failed!", error.message);
      setError("Login failed. Please check your username and password.");
    }
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
                  <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label>Global ID</Form.Label>
                      <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter Your Global ID"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Your Password"
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
                          onClick={handleLogin}
                        >
                          Sign in
                        </Button>
                      </Col>
                    </Form.Group>
                  </Form>
                  {error && <p style={{ color: "red" }}>{error}</p>}

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
      </div>
    </>
  );
}

export default LoginPage;
