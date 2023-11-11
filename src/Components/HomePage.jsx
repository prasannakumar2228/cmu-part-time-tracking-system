import React from "react";
import cmulogo from "../Images/cmu_background.jpg";
import logo from "../Images/cmich_logo.png";
import "./styles.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div
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
              About
            </Nav.Link>
            <Nav.Link className="nav_link" to="/login" as={Link}>
              Login
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default HomePage;
