import React, { useState } from "react";
import "./styles.css";
import Container from "react-bootstrap/Container";
import Select from "react-select";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/material.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import cmichImage from "../Images/login_background.png";
import { useFormik } from "formik";
import { object, string } from "yup";
import * as yup from "yup";
import Spinner from "react-bootstrap/Spinner";
import { postSignup } from "../redux/signUp";

function SignupPage({ authSignUp }) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const history = useNavigate();
  const [error, setError] = useState("");

  const options = [
    { value: "Student", label: "STUDENT" },
    { value: "Manager", label: "MANAGER" },
    { value: "Admin", label: "ADMIN" },
  ];

  const dispatch = useDispatch();
  // const signUpData = useSelector((state) => state.home.signUp);

  const getInitialValues = (data = {}) => {
    return {
      First_Name: "",
      Last_Name: "",
      Phone: "",
      Email: "",
      username: "",
      password: "",
      Role: { label: "", value: "" },
    };
  };

  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleBlurPassword = () => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleBlurConfirmPassword = () => {
    if (confirmPassword !== password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };
  const {
    getFieldProps,
    handleSubmit,
    touched,
    errors,
    isSubmitting,
    setFieldValue,
    values,
    handleChange,
  } = useFormik({
    validationSchema: object().shape({
      First_Name: string().trim().required("First Name is required"),
      Last_Name: string().trim().required("Last Name is required"),
      username: string().trim().required("Last Name is required"),
      Email: string().trim().required("User Name is required"),
      password: string()
        .trim()
        .required("Password is required")
        .min(6, "Minimum 6 characters")
        .max(12, "Maximum 12 characters"),
      Phone: string().trim().required("Mobile is required"),
      Role: yup.string().ensure().required("Select Subscription"),
    }),
    initialValues: getInitialValues(),
    enableReinitialize: true,
    // onSubmit,
  });

  const handleClick = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/profiles",
        {
          // Convert data to JSON string using JSON.stringify
          First_Name: values.First_Name,
          Last_Name: values.Last_Name,
          Phone: phone,
          Email: values.Email,
          Role: values.Role.value,
          DOB: "2023-11-13",
          Gender: "M",
          active: true,
          City: "",
          State: "Michigan",
          Zipcode: "48858",
          Country: "United States",
          user: {
            username: values.username,
            password: values.password,
            first_name: values.First_Name,
            last_name: values.Last_Name,
            email: values.Email,
          },
        },
        {
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
        }
      );
      console.log("Signup successful!", response.data);
      Toast.fire({
        icon: "success",
        title: "Signup successfully",
      });
      history("/login");
    } catch (error) {
      console.error("signup failed!", error.message);
      setError("signup failed...");
      Toast.fire({
        icon: "error",
        title: "Signup failed",
      });
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
          <Row className="justify-content-center" style={{ padding: "40px" }}>
            <Col lg={8} sm={5}>
              <Card>
                <Card.Body>
                  <Card.Title className="text-center loginpageHeading">
                    Signup Page
                  </Card.Title>
                  <hr />
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col xs="6">
                        <Form.Group className="mb-3">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your first name"
                            name="First_Name"
                            value={values.First_Name}
                            onChange={handleChange}
                            {...getFieldProps("First_Name")}
                            isValid={touched.First_Name && !errors.First_Name}
                          />
                          {touched.First_Name && errors.First_Name ? (
                            <Form.Control.Feedback>
                              {errors.First_Name}
                            </Form.Control.Feedback>
                          ) : null}{" "}
                        </Form.Group>
                      </Col>
                      <Col xs="6">
                        <Form.Group className="mb-3">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your last name"
                            name="Last_Name"
                            value={values.Last_Name}
                            // onChange={handleChange}
                            {...getFieldProps("Last_Name")}
                            isValid={touched.Last_Name && !errors.Last_Name}
                          />
                          {touched.Last_Name && errors.Last_Name ? (
                            <Form.Control.Feedback>
                              {errors.Last_Name}
                            </Form.Control.Feedback>
                          ) : null}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6">
                        <Form.Group className="mb-3">
                          <Form.Label>Email Id</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your Email"
                            name="Email"
                            value={values.Email}
                            // onChange={handleChange}
                            {...getFieldProps("Email")}
                            isValid={touched.Email && !errors.Email}
                          />
                          {touched.Email && errors.Email ? (
                            <Form.Control.Feedback>
                              {errors.Email}
                            </Form.Control.Feedback>
                          ) : null}
                        </Form.Group>
                      </Col>
                      <Col xs="6">
                        <Form.Group className="mb-3">
                          <Form.Label>Phone Number</Form.Label>
                          {/* <Form.Control
                            type="number"
                            name="Phone"
                            value={values.Phone}
                            // onChange={handleChange}
                            {...getFieldProps("Phone")}
                            isValid={touched.Phone && !errors.Phone}
                          />
                          {touched.Phone && errors.Phone ? (
                            <Form.Control.Feedback>
                              {errors.Phone}
                            </Form.Control.Feedback>
                          ) : null} */}
                          <PhoneInput
                            defaultCountry="us"
                            value={phone}
                            onChange={(value) => setPhone(value)}
                            inputStyle={{
                              width: "100%",
                              fontSize: "16px",
                              borderRadius: "5px",
                              border: "1px solid #ccc",
                              boxSizing: "border-box",
                            }}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6">
                        <Form.Group className="mb-3">
                          <Form.Label>
                            Global Id <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your Global ID"
                            name="username"
                            value={values.username}
                            // onChange={handleChange}
                            {...getFieldProps("username")}
                            isValid={touched.username && !errors.username}
                          />
                          {touched.username && errors.username ? (
                            <Form.Control.Feedback>
                              {errors.username}
                            </Form.Control.Feedback>
                          ) : null}
                        </Form.Group>
                      </Col>
                      <Col xs="6">
                        <Form.Group className="mb-3">
                          <Form.Label>Student ID</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Your Student ID"
                            // name="Phone"
                            // value={values.Phone}
                            // onChange={handleChange}
                            // isValid={touched.Phone && !errors.Phone}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6">
                        <Form.Group className="mb-3">
                          <Form.Label>
                            Password <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={handlePasswordChange}
                            onBlur={handleBlurPassword}
                            className={passwordError ? "error" : ""}
                            // minLength="6"
                            // maxLength="15"
                            {...getFieldProps("password")}
                            invalid={!!touched.password && !!errors.password}
                          />
                          {touched.password && errors.password ? (
                            <Form.Control.Feedback>
                              {errors.password}
                            </Form.Control.Feedback>
                          ) : (
                            <div style={{ height: "20px" }} />
                          )}
                        </Form.Group>
                      </Col>
                      <Col xs="6">
                        <Form.Group className="mb-3">
                          <Form.Label> Confirm Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Enter Confirm Password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            onBlur={handleBlurConfirmPassword}
                            className={passwordError ? "error" : ""}
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
                          <Form.Label>
                            Role <span style={{ color: "red" }}>*</span>
                          </Form.Label>
                          <Select
                            id="Role"
                            name="Role"
                            options={options}
                            value={values.Role}
                            onChange={(selectedItem) => {
                              setFieldValue("Role", selectedItem);
                            }}
                            styles={{
                              container: (base) => ({ ...base, zIndex: 4 }),
                            }}
                            components={{
                              IndicatorSeparator: () => null,
                            }}
                            classNamePrefix="react_select"
                            placeholder="Role"
                            color="primary"
                            helperText={
                              touched.Role?.value ? errors.Role?.value : ""
                            }
                            error={
                              touched.Role?.value && Boolean(errors.Role?.value)
                            }
                          />
                          {errors.Role?.value && touched.Role?.value ? (
                            <small className="text-left danger-color">
                              {errors.Role?.value}
                            </small>
                          ) : null}
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
                        <Button
                          disabled={isSubmitting}
                          type="submit"
                          className="mt-5"
                          style={{
                            backgroundColor: "#6a0032",
                            color: "#fff",
                          }}
                          onClick={() => handleClick(values)}
                        >
                          <span className="login-text">
                            {isSubmitting ? (
                              <Spinner animation="border" role="status" />
                            ) : (
                              "Sign Up"
                            )}
                          </span>
                        </Button>
                      </Col>
                    </Form.Group>
                  </Form>
                  <Card.Text>
                    Already have an Account ?{" "}
                    <Card.Link href="/login" style={{ color: "#6a0032" }}>
                      Login in
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

export default SignupPage;
