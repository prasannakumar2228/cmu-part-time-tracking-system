import React, { useEffect, useState } from "react";
import "./styles.css";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import logo from "../Images/cmich_logo.png";
import { Card, Col, Row } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
// import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";

import Spinner from "react-bootstrap/Spinner";
import { getJobApplications, getWaitlistCount } from "../redux/student";
import { getJobs } from "../redux/manager";

function StudentApplications() {
  const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);
  const history = useNavigate();
  const userName = localStorage.getItem("username");

  const handlePage = (data) => {
    window.console.log(data?.row?.jobPost, userName);
    const jobid = data?.row?.jobPost;
    dispatch(getWaitlistCount(jobid, userName));

    setShow(true);
  };

  const columns = [
    {
      field: "AcademicStatus",
      headerName: "Academic Status",
      width: 200,
      label: (params) => {
        return <span className="">{params.row.AcademicStatus}</span>;
      },
    },
    {
      field: "Skills",
      headerName: "Skills",
      width: 300,
      label: (params) => {
        return <span className="">{params.row.Skills}</span>;
      },
    },
    {
      field: "Experience",
      headerName: "Experience",
      width: 200,
      label: (params) => {
        return <span className="">{params.row.Experience}</span>;
      },
    },
    {
      field: "DesiredWorkHours",
      headerName: "Desired Work Hours",
      width: 150,
      label: (params) => {
        return <span className="">{params.row.DesiredWorkHours}</span>;
      },
    },
    {
      field: "ApplicationStatus",
      headerName: "Application Status",
      width: 200,

      label: (params) => <div>{moment(params.row.ApplicationStatus)}</div>,
    },
    {
      field: "WorkStudyEligibility",
      headerName: "Work Eligibility",
      width: 150,
      label: (params) => {
        return (
          <span className="">
            {params.row.WorkStudyEligibility ? "YES" : "NO"}
          </span>
        );
      },
    },
    {
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="d-flex">
            <div style={{ marginRight: "5px" }}>
              <Button variant="outline-info" onClick={() => handlePage(params)}>
                Wait List
              </Button>{" "}
            </div>
          </div>
        );
      },
    },
  ];

  //   useEffect(() => {
  //     dispatch(getJobs());
  //   }, [dispatch]);

  //   const jobs = useSelector((state) => state.manager.jobPosts);
  //   const isLoading = useSelector((state) => state.manager.isLoading);
  //   const error = useSelector((state) => state.manager.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobApplications());
  }, [dispatch]);

  const jobApp = useSelector((state) => state.student.jobApplications);
  const jobCount = useSelector((state) => state.student.count);

  const isLoading = useSelector((state) => state.student.isLoading);
  const error = useSelector((state) => state.student.error);
  const [show, setShow] = useState(false);

  window.console.log(jobCount?.position);

  if (isLoading) {
    return (
      <h1>
        <Spinner animation="grow" />
      </h1>
    );
  }

  window.console.log(error);

  if (error) {
    return (
      <>
        <Navbar className="nav-background">
          <Container>
            <Navbar.Brand to="/" as={Link}>
              <img src={logo} alt="logo" height={50} width={250} />
            </Navbar.Brand>{" "}
            {/* <Nav className="me-auto">
      <Nav.Link to="/" as={Link}>
        Home
      </Nav.Link>
      <Nav.Link to="/my-account" as={Link}>
        My Account
      </Nav.Link>
    </Nav> */}
            {/* <Nav>
        <Nav.Link className="nav_link" to="/" as={Link}>
          <Button variant="outline-light">Apply Job</Button>{" "}
        </Nav.Link>
      </Nav> */}
          </Container>
        </Navbar>
        <Container fluid className="p-5">
          <Card>
            <Card.Header>
              <b>Job Openings</b>
            </Card.Header>
            <Card.Body className="text-center">No Job Applications</Card.Body>
          </Card>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar className="nav-background">
        <Container>
          <Navbar.Brand to="/" as={Link}>
            <img src={logo} alt="logo" height={50} width={250} />
          </Navbar.Brand>{" "}
          {/* <Nav className="me-auto">
          <Nav.Link to="/" as={Link}>
            Home
          </Nav.Link>
          <Nav.Link to="/my-account" as={Link}>
            My Account
          </Nav.Link>
        </Nav> */}
          {/* <Nav>
            <Nav.Link className="nav_link" to="/" as={Link}>
              <Button variant="outline-light">Apply Job</Button>{" "}
            </Nav.Link>
          </Nav> */}
        </Container>
      </Navbar>
      <Container fluid className="p-5">
        <Card>
          <Card.Header>
            <b>Job Openings</b>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <DataGrid
                  {...jobApp}
                  rows={jobApp}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Wait List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>
            You are in the Waitlist Position of:{" "}
            <b>{jobCount ? jobCount?.position : ""}</b>
          </h5>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default StudentApplications;
