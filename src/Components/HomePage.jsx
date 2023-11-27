import React from "react";
import cmulogo from "../Images/cmu_background.jpg";
import logo from "../Images/cmich_logo.png";
import "./styles.css";
import Container from "react-bootstrap/Container";
import moment from "moment";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function HomePage() {
  const jobDate = localStorage.getItem("date");
  window.console.log("jobDate:", jobDate);

  const isValidDate = moment(jobDate, "YYYY-MM-DD", true).isValid();
  window.console.log("isValidDate:", isValidDate);

  const formattedDate = isValidDate
    ? moment(jobDate).format("MM-DD-YYYY")
    : "Coming soon...!";

  return (
    <div
      className="background-container"
      style={{
        backgroundImage: `url(${cmulogo})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Navbar className="nav-background">
        <Container>
          <Navbar.Brand to="/" as={Link}>
            <img src={logo} alt="logo" height={50} width={250} />
          </Navbar.Brand>

          <Nav>
            <Nav.Link className="nav_link" to="/" as={Link}>
              About
            </Nav.Link>
            <Nav.Link className="nav_link" to="/login" as={Link}>
              Login
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="white-background">
        <div className="text-container">
          <h2>The job fair will start: {formattedDate}</h2>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
