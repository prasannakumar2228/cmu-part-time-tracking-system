import React, { useState, useEffect } from "react";
import "./styles.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useParams } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import logo from "../Images/cmich_logo.png";
import { Col, Row, Card } from "react-bootstrap";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDeleteOutline, MdOutlineEdit } from "react-icons/md";
import Spinner from "react-bootstrap/Spinner";
import { hireGetData } from "../redux/manager";
import { updateJobApplications } from "../redux/student";
import { getLoginUserDetails } from "../redux/signUp";

function HirePage(props) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(hireGetData(id));
    } else {
      dispatch(hireGetData());
    }
  }, [dispatch]);

  const HiringPersonDetails = useSelector((state) => state.manager.hireDetails);
  const isLoading = useSelector((state) => state.manager.isLoading);
  const error = useSelector((state) => state.manager.error);

  const handleApprove = async (data) => {
    const payload = {
      AcademicStatus: data?.row?.AcademicStatus,
      Skills: data?.row?.Skills,
      Experience: data?.row?.Experience,
      DesiredWorkHours: data?.row?.DesiredWorkHours,
      WorkStudyEligibility: data?.row?.WorkStudyEligibility,
      jobPost: data?.row?.jobPost,
      Student: data?.row?.Student,
      ApplicationStatus: "approved",
    };

    const finalID = data?.row?.id;

    const finalData = { ...payload, finalID };

    dispatch(updateJobApplications(finalData));

    Toast.fire({
      icon: "success",
      title: "Updated values successfully",
    });

    window.location.reload();
  };

  const handlereject = async (data) => {
    const payload = {
      AcademicStatus: data?.row?.AcademicStatus,
      Skills: data?.row?.Skills,
      Experience: data?.row?.Experience,
      DesiredWorkHours: data?.row?.DesiredWorkHours,
      WorkStudyEligibility: data?.row?.WorkStudyEligibility,
      jobPost: data?.row?.jobPost,
      Student: data?.row?.Student,
      ApplicationStatus: "rejected",
    };

    const finalID = data?.row?.id;

    const finalData = { ...payload, finalID };

    // dispatch(updateJobApplications(finalData));

    Swal.fire({
      title: "Are you sure?",
      html: `You won't be able to revert `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, Delete it!",
      showCloseButton: true,
      showLoaderOnConfirm: true,
      reverseButtons: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: async () => {
        try {
          dispatch(updateJobApplications(finalData));

          Toast.fire({
            icon: "success",
            title: "Deleted successfully",
          });
          window.location.reload();
        } catch (error) {
          window.console.error(error);
          Swal.showValidationMessage(
            "Failed to delete. Please try again later."
          );
        }
      },
    });
    // window.location.reload();
  };

  const columns = [
    {
      field: "Student",
      // headerName: "Department Name",
      width: 200,
      renderHeader: () => <strong>{"Student Name "}</strong>,

      label: (params) => (
        <span className="">{params.row.Student?.First_Name}</span>
      ),
    },
    {
      field: "AcademicStatus",
      // headerName: "Department Name",
      width: 200,
      renderHeader: () => <strong>{"Academic Status "}</strong>,

      label: (params) => {
        return <span className="">{params.row.AcademicStatus}</span>;
      },
    },
    {
      field: "Skills",
      // headerName: "Openings",
      renderHeader: () => <strong>{"Skills "}</strong>,

      width: 300,
      label: (params) => {
        return <span className="">{params.row.Skills}</span>;
      },
    },
    {
      field: "Experience",
      headerName: "Experience",
      renderHeader: () => <strong>{"Experience "}</strong>,

      width: 150,
      label: (params) => {
        return <span className="">{params.row.Experience}</span>;
      },
    },
    {
      field: "DesiredWorkHours",
      // headerName: "Work Hours",
      renderHeader: () => <strong>{"Work Hours "}</strong>,

      width: 100,
      label: (params) => {
        return <span className="">{params.row.DesiredWorkHours}</span>;
      },
    },
    {
      field: "ApplicationStatus",
      // headerName: "ApplicationStatus",
      renderHeader: () => <strong>{"Application Status "}</strong>,

      width: 200,
      label: (params) => {
        return <span className="">{params.row.ApplicationStatus}</span>;
      },
    },
    {
      // headerName: "Actions",
      renderHeader: () => <strong>{"Actions "}</strong>,

      width: 200,
      renderCell: (params) => {
        return (
          <div className="d-flex">
            <div style={{ marginRight: "5px" }}>
              <Button
                variant="outline-success"
                onClick={() => handleApprove(params)}
              >
                Approved
              </Button>{" "}
            </div>
            <div style={{ marginRight: "5px" }}>
              <Button
                variant="outline-danger"
                onClick={() => handlereject(params)}
              >
                Declined
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
              <b>Applied Details</b>
            </Card.Header>
            <Card.Body className="text-center">
              No applications found for this job post
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }

  window.console.log(HiringPersonDetails);

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
        </Container>
      </Navbar>
      <Container fluid className="p-5">
        <Card>
          <Card.Header>
            <b>Applied Details</b>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <DataGrid
                  {...HiringPersonDetails}
                  rows={HiringPersonDetails}
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

export default HirePage;
