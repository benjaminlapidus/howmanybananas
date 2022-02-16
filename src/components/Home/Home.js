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
import LogoImg from "../../img/Background.png";
import List from "react-tiny-virtual-list";
import Badge from "react-bootstrap/Badge";
import { useRive } from "rive-react";

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

  const params = {
    src: require("./../../img/bananahomepage.riv").default,
    autoplay: true,
  };
  const { RiveComponent, rive } = useRive(params);

  return (
    <main>
      <section className="py-4 px-5 bg-yellow-gradient position-relative">
        <div className="custom-shape-divider-bottom-1644902282">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <Container
          fluid
          className="w-100 contained"
          style={{
            minHeight: "80vh",
          }}
        >
          <Row className="px-5">
            <Col md={12} lg={6}>
              <h1 className="head">
                bananas
                <br />
                <span className="are">are</span>
                <span className="rad">RAD</span>
              </h1>
              <p className="lead text-dark p-2 size-4">
                Putting radiation into context
              </p>
            </Col>
            <Col md={12} lg={6}>
              <div className="pt-4 h-100">
                <RiveComponent />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-padding px-5 bg-brown position-relative">
        <Container fluid className="w-100 contained">
          <Row className="justify-content-sm-center justify-content-md-end">
            <Col sm={{ span: 12, offset: 0 }} md={{ span: 5, offset: 0 }}>
              <img
                className="justify-content-md-center"
                alt=""
                src="https://loremflickr.com/400/400/banana"
              />
            </Col>
            <Col
              sm={{ span: 12, offset: 0 }}
              md={{ span: 6, offset: 0 }}
              className="my-auto"
            >
              <Jumbotron>
                <h2 className="text-white size-3 mt-3 ">
                  Radioactive Bananas?!
                </h2>
                <p className="text-light lead">
                  Bananas naturally contain a{" "}
                  <span className="radiation-highlight">
                    radioactive isotope
                  </span>{" "}
                  called potassium-40. Not to worry — you'd need to munch down
                  10,000,000 bananas in one sitting to get a fatal dose.
                </p>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-padding px-5 bg-yellow-gradient">
        <div class="custom-shape-divider-bottom-1644902282">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
        <div class="custom-shape-divider-top-1644902677">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
        <Container
          fluid
          className="w-100 contained"
          style={{
            minHeight: "75vh",
          }}
        >
          <Row>
            <h3 className="size-4 mb-5 text-center">Radiation Calculator</h3>
            <Col md={{ span: 10, offset: 1 }}>
              <div className="m4">
                <Row>
                  <Col>
                    <Tabs defaultActiveKey="flight" transition={false}>
                      <Tab eventKey="flight" title="Flight">
                        <div>
                          <Form>
                            <Row className="Home__triage-input-wrapper">
                              <Col
                                xs={12}
                                sm={5}
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
                                  renderMenuItemChildren={(
                                    result,
                                    props,
                                    index
                                  ) => (
                                    <div
                                      key={index}
                                      className="result-wrapper p-0"
                                    >
                                      <p className="result-main m-0 p-0">
                                        {result}
                                      </p>
                                    </div>
                                  )}
                                />
                              </Col>
                              <Col
                                xs={12}
                                sm={5}
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
                                  renderMenuItemChildren={(
                                    result,
                                    props,
                                    index
                                  ) => (
                                    <div
                                      key={index}
                                      className="result-wrapper p-0"
                                    >
                                      <p className="result-main m-0 p-0">
                                        {result}
                                      </p>
                                    </div>
                                  )}
                                />
                              </Col>
                              <Col
                                xs={12}
                                sm={12}
                                md={2}
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
                      <Tab eventKey="sunburn" title="Sunburn">
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
            </Col>
          </Row>

          <h3>
            What's my radiation exposure while{" "}
            <span className="size-3">flying?</span>
          </h3>
        </Container>
      </section>

      <section className="section-padding text-light px-5 bg-brown">
        <Container fluid className="w-100 contained">
          <h3 className="size-4 mb-5">
            Radiation through History{" "}
            <span className="badge bg-secondary">Coming soon</span>
          </h3>
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
      </section>
    </main>
  );
}

export default Home;
