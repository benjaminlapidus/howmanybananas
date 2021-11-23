import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

import About from "./components/About/About";
import Flight from "./components/Flight/Flight";
import Home from "./components/Home/Home";
import Story from "./components/Story/Story";
import Container from 'react-bootstrap/Container';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

function App() {
  return (
    <div className="App" id="main-container">
      <Router>
        <nav id="main-nav">
          <Container>
            <Row>
              <Col>
                <ul className="nav__pages">
                  <li>
                    <NavLink className="" exact to="/">
                      BananaRadiation
                    </NavLink>
                  </li>
                </ul>
              </Col>
              <Col>
                <ul className="nav__pages">
                  <li>
                    <NavLink
                      className=""
                      activeClassName="active"
                      to="/about"
                    >
                      About
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className=""
                      activeClassName="active"
                      to="/stories"
                    >
                      Stories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className=""
                      activeClassName="active"
                      to="/contact"
                    >
                      Contact
                    </NavLink>
                  </li>
                </ul>
              </Col>
            </Row>

          </Container>
        </nav>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/flight" component={Flight} />
          <Route path="/about" component={About} />
          <Route path="/story" component={Story} />
        </Switch>
        <footer></footer>
      </Router>
    </div>
  );
}

export default App;