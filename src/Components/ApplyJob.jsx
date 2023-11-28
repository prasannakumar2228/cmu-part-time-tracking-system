import React, { useState, useEffect } from "react";
import "./styles.css";
import Container from "react-bootstrap/Container";
import Select from "react-select";
import Navbar from "react-bootstrap/Navbar";
import { useFormik } from "formik";
import { object, string } from "yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import logo from "../Images/cmich_logo.png";
import { Card, Col, Row, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { getStudentDetails } from "../redux/signUp";
import { postJobApplications } from "../redux/student";

function ApplyJob() {
  const options = [
    { value: "freshman", label: "FRESHMAN" },
    { value: "sophomore", label: "SOPHOMORE" },
    { value: "junior", label: "JUNIOR" },
    { value: "senior", label: "SENIOR" },
    { value: "graduate", label: "GRADUATE" },
  ];

  const username = localStorage.getItem("username");

  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useNavigate();

  const studentId = useSelector((state) => state.home.studentDetails);
  const isLoading = useSelector((state) => state.manager.isLoading);
  const error = useSelector((state) => state.manager.error);

  const getInitialValues = (data = {}) => {
    return {
      Skills: "",
      Experience: "",
      DesiredWorkHours: "",
      WorkStudyEligibility: "",
      AcademicStatus: { label: "", value: "" },
    };
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
      Experience: string().trim().required("First Name is required"),
      AcademicStatus: yup.string().ensure().required(""),
    }),
    initialValues: getInitialValues(),
    enableReinitialize: true,
    // onSubmit,
  });

  useEffect(() => {
    if (username) {
      dispatch(getStudentDetails(username));
    }
  }, [username]);

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

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleClose = () => {
    history("/student-homepage");
  };

  const handleRadioChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      WorkStudyEligibility: e.target.value,
    }));
  };

  const handleSave = async () => {
    window.console.log(values);

    const data = {
      AcademicStatus: values?.AcademicStatus?.value,
      Skills: values?.Skills,
      Experience: values?.Experience,
      DesiredWorkHours: values?.DesiredWorkHours,
      WorkStudyEligibility:
        formData?.WorkStudyEligibility === "YES" ? true : false,
      jobPost: id ? id : "",
      Student: studentId ? studentId : "",
      ApplicationStatus: "waitlist",
    };

    dispatch(postJobApplications(data))
      .unwrap()
      .then((result) => {
        // Handle successful update
        console.log("applied successful:", result);
      })
      .catch((error) => {
        // Handle error
        console.error("applied failed:", error);
      });
    window.location.reload();
  };

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
            <b>Apply Job Form</b>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                {/* <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Academic Status</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Academic Status"
                    name="AcademicStatus"
                    value={formData ? formData.AcademicStatus : ""}
                    onChange={handleChange}
                  />
                </Form.Group> */}

                <Form.Group as={Col} className="mb-3">
                  <Form.Label>Academic Status</Form.Label>

                  <Select
                    id="AcademicStatus"
                    name="AcademicStatus"
                    options={options}
                    value={values.AcademicStatus}
                    onChange={(selectedItem) => {
                      setFieldValue("AcademicStatus", selectedItem);
                    }}
                    styles={{
                      container: (base) => ({ ...base, zIndex: 4 }),
                    }}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    classNamePrefix="react_select"
                    placeholder=" Select AcademicStatus"
                    color="primary"
                    helperText={
                      touched.AcademicStatus?.value
                        ? errors.AcademicStatus?.value
                        : ""
                    }
                    error={
                      touched.AcademicStatus?.value &&
                      Boolean(errors.AcademicStatus?.value)
                    }
                  />
                  {errors.AcademicStatus?.value &&
                  touched.AcademicStatus?.value ? (
                    <small className="text-left danger-color">
                      {errors.AcademicStatus?.value}
                    </small>
                  ) : null}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Experience</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your Experience"
                    name="Experience"
                    value={values.Experience}
                    // onChange={handleChange}
                    {...getFieldProps("Experience")}
                    isValid={touched.Experience && !errors.Experience}
                  />
                  {touched.Experience && errors.Experience ? (
                    <Form.Control.Feedback>
                      {errors.Experience}
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Desired Work Hours</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter your DesiredWorkHours"
                    name="DesiredWorkHours"
                    value={values.DesiredWorkHours}
                    // onChange={handleChange}
                    {...getFieldProps("DesiredWorkHours")}
                    isValid={
                      touched.DesiredWorkHours && !errors.DesiredWorkHours
                    }
                  />
                  {touched.DesiredWorkHours && errors.DesiredWorkHours ? (
                    <Form.Control.Feedback>
                      {errors.DesiredWorkHours}
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
              </Row>
              <Row>
                <Col xs="6">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Skills</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="Skills"
                      value={values.Skills}
                      // onChange={handleChange}
                      {...getFieldProps("Skills")}
                      isValid={touched.Skills && !errors.Skills}
                    />
                    {touched.Skills && errors.Skills ? (
                      <Form.Control.Feedback>
                        {errors.Skills}
                      </Form.Control.Feedback>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col xs="6" className="mt-5">
                  <Form.Group
                    as={Col}
                    controlId="formGridEmail"
                    style={{ display: "flex" }}
                  >
                    <Form.Label>Work Study Eligibility: </Form.Label>{" "}
                    <Form.Check
                      style={{ width: "auto", marginLeft: "2rem" }}
                      type="radio"
                      label="YES"
                      name="WorkStudyEligibility"
                      id="WorkStudyEligibility1"
                      value="YES"
                      checked={formData.WorkStudyEligibility === "YES"}
                      onChange={handleRadioChange}
                    />
                    <Form.Check
                      style={{ width: "auto", marginLeft: "2rem" }}
                      type="radio"
                      label="NO"
                      name="WorkStudyEligibility"
                      id="WorkStudyEligibility2"
                      value="NO"
                      checked={formData.WorkStudyEligibility === "NO"}
                      onChange={handleRadioChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="text-center mt-5">
                <Col>
                  <Button
                    variant="secondary"
                    style={{ marginRight: "1rem" }}
                    onClick={() => handleClose()}
                  >
                    Close
                  </Button>{" "}
                  <Button
                    variant="light"
                    type="submit"
                    style={{ backgroundColor: "#6a0032", color: "#fff" }}
                    onClick={() => handleSave(values)}
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

export default ApplyJob;
