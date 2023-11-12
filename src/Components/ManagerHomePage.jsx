import React, { useState, useEffect } from "react";
import "./styles.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import logo from "../Images/cmich_logo.png";
import { Col, Row, Card, Tooltip } from "react-bootstrap";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "react-bootstrap/Modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";
import Spinner from "react-bootstrap/Spinner";
import { getJobs } from "../redux/manager";

function ManagerHomePage(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);
  const [date, setDate] = useState(new Date());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch]);

  const jobs = useSelector((state) => state.manager.jobPosts);
  const isLoading = useSelector((state) => state.manager.isLoading);
  const error = useSelector((state) => state.manager.error);

  const handleDateChange = (date) => {
    setDate(date);
  };

  // const rows = [
  //   { id: 1, col1: "Hello", col2: "World" },
  //   { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  //   { id: 3, col1: "MUI", col2: "is Amazing" },
  // ];

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

  window.console.log(jobs);

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
              <Button variant="outline-light">Post Job</Button>{" "}
            </Nav.Link>
            <Nav.Link className="nav_link">
              <Button variant="outline-light" onClick={handleShow}>
                Post Career Fair Date
              </Button>{" "}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container fluid className="p-5">
        <Card>
          <Card.Header>
            <b>Posted Jobs</b>
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
                  checkboxSelection
                />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
      <Modal
        show={modalShow}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          {/* <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title> */}
        </Modal.Header>
        <Modal.Body className="p-5">
          {" "}
          <Calendar onChange={handleDateChange} value={date} />
          <h5 className="mt-3">
            {date instanceof Date
              ? `Selected Date: ${format(date, "MM-dd-yyyy")}`
              : "Please select a valid date"}
          </h5>
          <Button
            variant="outline-success"
            className="mt-3"
            onClick={handleClose}
          >
            OK
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ManagerHomePage;
