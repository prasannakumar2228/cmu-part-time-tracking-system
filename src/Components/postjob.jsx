import React, { useState, useEffect } from "react";
import "./styles.css";
import Container from "react-bootstrap/Container";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import logo from "../Images/cmich_logo.png";
import { Card, Col, Row, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import {
  setProfile,
  postJobs,
  updateJobs,
  fetchDatabyID,
} from "../redux/manager";

function PostJob() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useNavigate();

  window.console.log(id);

  const profileData = useSelector((state) => state.manager.profile);
  const putData = useSelector((state) => state.manager.updateData);

  const isLoading = useSelector((state) => state.manager.isLoading);
  const error = useSelector((state) => state.manager.error);

  const [formData, setFormData] = useState(putData || profileData || {});

  useEffect(() => {
    window.console.log(id);
    if (id) {
      dispatch(fetchDatabyID(id));
    }
  }, [id, dispatch]);
  window.console.log(putData);
  useEffect(() => {
    setFormData(putData || profileData || {});
  }, [putData, profileData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataWithId = { ...formData, id };
    console.log("Data with ID:", JSON.stringify(dataWithId));

    const action = formData?.id ? updateJobs(dataWithId) : postJobs(formData);
    dispatch(action)
      .unwrap()
      .then((result) => {
        // Handle successful update
        console.log("Update successful:", result);
      })
      .catch((error) => {
        // Handle error
        console.error("Update failed:", error);
      });
    window.location.reload();
  };

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

  const handleClose = () => {
    history("/manager-homepage");
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
            <b>Post Job Form</b>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Department Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Department Name"
                    name="Title"
                    value={formData.Title}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Number of Openings</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Department Name"
                    name="NumberOfOpenings"
                    value={formData.NumberOfOpenings}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Experience</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Job Type"
                    name="Experience"
                    value={formData.Experience}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Col xs="6">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Job Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="Description"
                      value={formData.Description}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs="6">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Requirement</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="Requirement"
                      value={formData.Requirement}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Job Created Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter Department Name"
                    name="DateOfPosting"
                    value={formData.DateOfPosting}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Last Date for Apply</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter Job Type"
                    name="Deadline"
                    value={formData.Deadline}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Work Hours</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Job Type"
                    name="WorkHours"
                    value={formData.WorkHours}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Hourley Wage</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Job Type"
                    name="HourlyWage"
                    value={formData.HourlyWage}
                    onChange={handleChange}
                  />
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
                      rows={3}
                      name="Skills"
                      value={formData.Skills}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              {/* <Row className="mb-3">
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
              </Row> */}
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
