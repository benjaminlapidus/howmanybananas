import React from "react";
import { HashRouter as Router, Switch, Route, NavLink } from "react-router-dom";

import About from "./components/About/About";
import Flight from "./components/Flight/Flight";
import Home from "./components/Home/Home";
import Story from "./components/Story/Story";
import Contact from "./components/Contact/Contact";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavItem from "react-bootstrap/NavItem";

import NavDropdown from "react-bootstrap/NavDropdown";

import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App" id="main-container">
      <Router>
        <Navbar
          collapseOnSelect
          expand="lg"
          id="main-nav"
          className="bg-yellow-gradient"
        >
          <Container>
            <Navbar.Brand href="#home">RadBanana?</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <NavItem eventkey={2} href="/about">
                  <Nav.Link as={NavLink} to="/about">
                    About
                  </Nav.Link>
                </NavItem>
                <NavItem eventkey={2} href="/contact">
                  <Nav.Link as={NavLink} to="/contact">
                    Contact
                  </Nav.Link>
                </NavItem>
              </Nav>
              <Nav>
                <NavItem eventkey={3} href="/temp1">
                  <Nav.Link as={NavLink} to="/temp1">
                    Get Started
                  </Nav.Link>
                </NavItem>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/flight" component={Flight} />
          <Route path="/about" component={About} />
          <Route path="/story" component={Story} />
          <Route path="/contact" component={Contact} />
        </Switch>
        <footer></footer>
      </Router>
    </div>
  );
}

export default App;
