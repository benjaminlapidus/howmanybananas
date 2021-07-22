import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

import About from "./components/About/About";
import Flight from "./components/Flight/Flight";
import Home from "./components/Home/Home";
import Story from "./components/Story/Story";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

function App() {
  return (
    <div className="App" id="main-container">
      <Router basename={'/howmanybananas'}>
        <div className="padded">
          <nav id="main-nav">
            <NavLink className="logo" exact to="/">
            <p>BananaRadiation</p>
            </NavLink>

            <ul className="nav__pages center">
              <li>
                <NavLink
                  className="underline-link"
                  activeClassName="active"
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="underline-link"
                  activeClassName="active"
                  to="/contact"
                >
                  Stories
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="underline-link"
                  activeClassName="active"
                  to="/contact"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
          </div>

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