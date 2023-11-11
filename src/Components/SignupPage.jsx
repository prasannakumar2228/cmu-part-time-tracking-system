import React, { useState } from "react";
import "./styles.css";
import Container from "react-bootstrap/Container";
import Select from "react-select";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import cmichImage from "../Images/login_background.png";
import { useFormik } from "formik";
import { object, string } from "yup";
import * as yup from "yup";
import Spinner from "react-bootstrap/Spinner";
import { postSignup } from "../redux/signUp";

function SignupPage({ authSignUp }) {
  const options = [
    { value: "STUDENT", label: "STUDENT" },
    { value: "MANAGER", label: "MANAGER" },
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

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  // Event handler for the password input
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordMatch(newPassword === confirmPassword);
  };

  // Event handler for the confirm password input
  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordMatch(password === newConfirmPassword);
  };

  // const onSubmit = async (values, { setSubmitting, resetForm }, e) => {
  //   e.preventDefault();
  //   window.console.log(values);
  //   setSubmitting(true);
  //   setErrorMsg(null);
  //   const data = {
  //     First_Name: values.First_Name,
  //     Last_Name: values.Last_Name,
  //     Phone: values.Phone,
  //     Email: values.Email,
  //     Role: values.Role.value,
  //     DOB: "",
  //     Gender: "",
  //     active: true,
  //     City: "",
  //     State: "Michigan",
  //     Zipcode: "48858",
  //     Country: "United States",
  //     user: {
  //       username: values.username,
  //       password: values.password,
  //       first_name: values.First_Name,
  //       last_name: values.Last_Name,
  //       email: values.Email,
  //     },
  //   };
  //   window.console.log(data);
  //   try {
  //     dispatch(authSignUp(data));
  //     resetForm();
  //     // Toast.fire({
  //     //   icon: "success",
  //     //   title: "Account Created Successfully",
  //     // });

  //     // if (saveExit) {
  //     //   redirect();
  //     // }
  //   } catch (error) {
  //     setErrorMsg(error?.Error);
  //     window.console.log(error);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const {
    getFieldProps,
    handleSubmit,
    setErrorMsg,
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

  const handleClick = async () => {
    const data = {
      First_Name: values.First_Name,
      Last_Name: values.Last_Name,
      Phone: values.Phone,
      Email: values.Email,
      Role: values.Role.value,
      DOB: "",
      Gender: "",
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
    };

    window.console.log(data);
    dispatch(postSignup(data));
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
                            //   type="text"
                            //   name="First_Name"
                            //   placeholder="Enter your first name"
                            //   value={values.First_Name}
                            //   // onChange={handleChange}
                            //   {...getFieldProps("First_Name")}
                            //   isValid={touched.First_Name && !errors.First_Name}
                            // />
                            // {touched.First_Name && errors.First_Name ? (
                            //   <Form.Control.Feedback>
                            //     {errors.First_Name}
                            //   </Form.Control.Feedback>
                            // ) : null}

                            type="text"
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
                          <Form.Control
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
                          ) : null}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6">
                        <Form.Group className="mb-3">
                          <Form.Label>Global Id</Form.Label>
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
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={handlePasswordChange}
                            minLength="6"
                            maxLength="13"
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
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    {passwordMatch === false ? (
                      passwordMatch ? (
                        <p>Passwords match.</p>
                      ) : (
                        <p>Passwords do not match.</p>
                      )
                    ) : (
                      ""
                    )}

                    <Row>
                      <Col xs="6">
                        {" "}
                        <Form.Group
                          className="mb-3"
                          // controlId="formGroupPassword"
                        >
                          <Form.Label>Role</Form.Label>
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
