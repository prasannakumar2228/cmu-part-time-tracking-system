import React, { useEffect } from "react";
import "./styles.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
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
import { getJobApplications } from "../redux/student";
import { getJobs } from "../redux/manager";

function StudentHomePage() {
  const history = useNavigate();

  const handlePage = (data) => {
    window.console.log(data?.row);
    if (data?.row?.id) {
      history(`/apply-job/${data?.row?.id}`);
    }
  };

  const columns = [
    {
      field: "Title",
      headerName: "Department Name",
      width: 300,
      label: (params) => {
        return <span className="">{params.row.Title}</span>;
      },
    },
    {
      field: "NumberOfOpenings",
      headerName: "Openings",
      width: 100,
      label: (params) => {
        return <span className="">{params.row.NumberOfOpenings}</span>;
      },
    },
    {
      field: "Experience",
      headerName: "Experience",
      width: 300,
      label: (params) => {
        return <span className="">{params.row.Experience}</span>;
      },
    },
    {
      field: "WorkHours",
      headerName: "Work Hours",
      width: 100,
      label: (params) => {
        return <span className="">{params.row.WorkHours}</span>;
      },
    },
    {
      field: "Deadline",
      headerName: "Deadline",
      width: 200,

      renderCell: (params) => (
        <div>{moment(params.row.Deadline).format("MM-DD-YYYY")}</div>
      ),
    },
    {
      field: "Status",
      headerName: "Status",
      width: 100,
      label: (params) => {
        return <span className="">{params.row.Status}</span>;
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
                Apply Job
              </Button>{" "}
            </div>
          </div>
        );
      },
    },
  ];

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getJobApplications());
  // }, [dispatch]);

  // const jobApp = useSelector((state) => state.student.jobApplications);
  // const isLoading = useSelector((state) => state.student.isLoading);
  // const error = useSelector((state) => state.student.error);

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  const jobs = useSelector((state) => state.manager.jobPosts);
  const isLoading = useSelector((state) => state.manager.isLoading);
  const error = useSelector((state) => state.manager.error);

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
            <Nav.Link className="nav_link" to="/my-applications" as={Link}>
              <Button variant="outline-light">My Applications</Button>{" "}
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
                  {...jobs}
                  rows={jobs}
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
    </>
  );
}

export default StudentHomePage;
