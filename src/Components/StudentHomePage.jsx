import React, { useEffect } from "react";
import "./styles.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import logo from "../Images/cmich_logo.png";
import { Card, Col, Row } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";

import Spinner from "react-bootstrap/Spinner";
import { getJobApplications } from "../redux/student";

function StudentHomePage() {
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
      field: "ApplicationStatus",
      headerName: "Application Status",
      width: 200,
      label: (params) => {
        return <span className="">{params.row.ApplicationStatus}</span>;
      },
    },
    {
      field: "DesiredWorkHours",
      headerName: "Work Hours",
      width: 100,
      label: (params) => {
        return <span className="">{params.row.DesiredWorkHours}</span>;
      },
    },
    {
      field: "Skills",
      headerName: "Skills",
      width: 200,
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
      field: "Student",
      headerName: "Applied Student",
      width: 200,
      label: (params) => {
        return <span className="">{params.row.Student}</span>;
      },
    },
    {
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="d-flex">
            <div style={{ marginRight: "5px" }}>
              <Button variant="outline-info">
                <MdOutlineEdit
                // onClick={() => toggle(_row)}
                />
              </Button>{" "}
            </div>
            <div>
              <Button variant="outline-danger">
                <MdOutlineDeleteOutline
                  size="1rem"
                  // onClick={() => {
                  //   handleDelete(_row);
                  // }}
                />
              </Button>{" "}
            </div>
          </div>
        );
      },
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobApplications());
  }, [dispatch]);

  const jobApp = useSelector((state) => state.student.jobApplications);
  const isLoading = useSelector((state) => state.student.isLoading);
  const error = useSelector((state) => state.student.error);

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

  window.console.log(jobApp);

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
          <Nav>
            <Nav.Link className="nav_link" to="/" as={Link}>
              <Button variant="outline-light">Apply Job</Button>{" "}
            </Nav.Link>
          </Nav>
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
                  checkboxSelection
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default StudentHomePage;
