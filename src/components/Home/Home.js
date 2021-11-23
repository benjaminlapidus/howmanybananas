import React, { Fragment, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import data from "../../csv/airport-name.csv";
import Tabs from "react-bootstrap/Tabs";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import List from "react-tiny-virtual-list";
import Badge from "react-bootstrap/Badge";
import {
  Typeahead,
  Highlighter,
  Menu,
  MenuItem,
} from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

import "./Home.css";

function Home() {
  const [options, setOptions] = useState([]);
  const [toAirport, setToAirport] = useState("");
  const [fromAirport, setFromAirport] = useState("");
  const [isToValid, setIsToValid] = useState(true);
  const [isFromValid, setIsFromValid] = useState(true);

  const history = useHistory();

  const airportData = new Map();

  useEffect(() => {
    fetch(data, { mode: "no-cors" })
      .then((res) => res.text())
      .then((text) => CSVToArray(text));
  }, []);

  //var csv is the CSV file with headers

  const validateAirports = () => {
    if (options.includes(toAirport.toString())) {
      setIsToValid(true);
    } else {
      setIsToValid(false);
    }

    if (options.includes(fromAirport.toString())) {
      setIsFromValid(true);
    } else {
      setIsFromValid(false);
    }
  };

  const CSVToArray = (data) => {
    data = data.replace(/(\r|\r)/gm, "");
    data = data.split(/\n/);
    var splitDataArray = [];
    for (var i = 0; i < data.length; i++) {
      splitDataArray.push(data[i].toString());
    }
    setOptions(splitDataArray);
  };

  return (
    <main id="Home__splash" className="bg-yellow">
      <Container fluid className="pt-5 px-5" style={{ minHeight: "120vh" }}>
        <Jumbotron id="Home__head-wrapper pos-absolute">
          <h1 className="head size-0">Bananas are rad.</h1>
          <p className="lead text-dark p-2 size-4">
            Well, they're <u>rad</u>ioactive.
          </p>
        </Jumbotron>
        <div className="mt-5 picker-wrapper">
          <Row>
            <Col>
              <Tabs defaultActiveKey="flight" transition={false}>
                <Tab eventKey="flight" title="Flight">
                  <div>
                    <Form>
                      <Row className="Home__triage-input-wrapper">
                        <Col
                          xs={12}
                          sm={6}
                          md={12}
                          className="first-input p-1 Home__triage-input"
                        >
                          <Typeahead
                            minLength={2}
                            id="pagination-example555"
                            className="Home__input"
                            isInvalid={!isFromValid}
                            maxResults={6}
                            highlightOnlyResult={true}
                            options={options}
                            onChange={(e) => setFromAirport(e)}
                            paginate={false}
                            placeholder="From"
                            renderMenuItemChildren={(result, props, index) => (
                              <div key={index} className="result-wrapper p-0">
                                <p className="result-main m-0 p-0">{result}</p>
                              </div>
                            )}
                          />
                        </Col>
                        <Col
                          xs={12}
                          sm={6}
                          md={12}
                          className="second-input p-1 Home__triage-input"
                        >
                          <Typeahead
                            minLength={2}
                            id="pagination-example555"
                            isInvalid={!isToValid}
                            className="Home__input"
                            maxResults={6}
                            highlightOnlyResult={true}
                            onChange={(e) => setToAirport(e)}
                            options={options}
                            paginate={false}
                            placeholder="To"
                            renderMenuItemChildren={(result, props, index) => (
                              <div key={index} className="result-wrapper p-0">
                                <p className="result-main m-0 p-0">{result}</p>
                              </div>
                            )}
                          />
                        </Col>
                        <Col
                          xs={12}
                          sm={12}
                          md={12}
                          className="p-1 Home__triage-input"
                        >
                          <Button
                            variant="primary"
                            block
                            onClick={() => {
                              validateAirports();
                              if (isToValid && isFromValid) {
                                let fromAirportIdx = options
                                  .indexOf(fromAirport.toString())
                                  .toString();
                                let toAirportIdx = options
                                  .indexOf(toAirport.toString())
                                  .toString();
                                history.push({
                                  pathname: "/flight",
                                  search:
                                    "?f=" +
                                    Buffer.from(fromAirportIdx).toString(
                                      "base64"
                                    ) +
                                    "&t=" +
                                    Buffer.from(toAirportIdx).toString(
                                      "base64"
                                    ),
                                  state: "100",
                                });
                              }
                            }}
                            className="Home__input"
                          >
                            Generate
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Tab>
                <Tab eventKey="sunburn" disabled title="Sunburn">
                  <div className="Home__triage-container">
                    <Form>
                      <Row className="Home__triage-input-wrapper">
                        <Col lg="5" className="Home__triage-input">
                          <Form.Control
                            className="Home__input"
                            placeholder="Time (hh:mm)"
                          />
                        </Col>
                        <Col lg="5" className="Home__triage-input">
                          <Form.Control
                            className="Home__input"
                            placeholder="Location"
                          />
                        </Col>
                        <Col lg="2" className="Home__triage-input">
                          <Button
                            variant="primary"
                            block
                            type="submit"
                            className="Home__input"
                          >
                            Generate
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Tab>
                <Tab eventKey="soon" title="Coming Soon" disabled></Tab>
              </Tabs>
            </Col>
          </Row>
        </div>
      </Container>

      <Container fluid className="bg-brown section-padding">
        <Row>
          <Col md={5}>
            <img
              className="float-end"
              alt=""
              src="https://loremflickr.com/400/400/banana"
            />
          </Col>
          <Col md={{ span: 4, offset: 1 }}>
            <Jumbotron>
              <h2 className="text-white size-3">Radioactive Bananas?!</h2>
              <p className="text-light lead">
                Did you know that bananas are full of a{" "}
                <span className="radiation-highlight">radioactive isotope</span>{" "}
                — potassium-40! Not to worry — you'd need to munch down
                10,000,000 bananas in one sitting to get a fatal dose.
              </p>
              <p>
                <Button variant="light">Learn more</Button>
              </p>
            </Jumbotron>
          </Col>
        </Row>
      </Container>

      <Container className="section-padding bg-yellow">
        <h2>
          Radiation through History{" "}
          <span class="badge bg-secondary">Coming soon</span>
        </h2>
        <Row id="Home__history">
          <Col lg={4}>
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img
                    alt=""
                    className="historyImg"
                    src="https://loremflickr.com/250/375/banana"
                  />
                </div>
                <div className="flip-card-back">
                  <h3>The Elephants Foot</h3>
                  <p>Chernobyl</p>
                  <p>We love that guy</p>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={4}>
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img
                    alt=""
                    className="historyImg"
                    src="https://loremflickr.com/250/375/banana"
                  />
                </div>
                <div className="flip-card-back">
                  <h3>John Doe</h3>
                  <p>Architect & Engineer</p>
                  <p>We love that guy</p>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={4}>
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img
                    alt=""
                    className="historyImg"
                    src="https://loremflickr.com/250/375/banana,jungle/all"
                  />
                </div>
                <div className="flip-card-back">
                  <h3>John Doe</h3>
                  <p>Architect & Engineer</p>
                  <p>We love that guy</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Home;
