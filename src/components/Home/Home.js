import React, { Fragment, useEffect, useState, useCallback } from "react";
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
  const [names, setNames] = useState([]);
  const [singleSelections, setSingleSelections] = useState([]);

const handleOnChange = event => {
  console.log(event);
  setSingleSelections(event);
  console.warn("Added!")
};

  useEffect(() => {
    document.body.style.backgroundColor = "#FDD535";
    fetch(data, { mode: "no-cors" })
      .then((res) => res.text())
      //.then((text) => console.log(text))
      .then((text) => CSVToArray(text));
  }, []);

  //var csv is the CSV file with headers

  const CSVToArray = (data) => {
    data = data.replace(/(\r|\r)/gm, "");
    data = data.split(/\n/);

    console.log("Length: " + data.length);

    var splitDataArray = [];

    for (var i = 0; i < data.length; i++) {
      var splitData = data[i].split(";");
      splitDataArray.push({
        airportId: splitData[0],
        airportCode: splitData[1],
        airportName: splitData[2],
      });
    }
    setOptions(data);
    setNames(splitDataArray);
  };

  const renderMenu = useCallback((results, menuProps, props) => {
    var tooManyResults = false;

    const itemHeight = 48;
    if (results.length > 5) {
      results = results.slice(0, 5);
      tooManyResults = true;
    }

    if (results.length !== 0) {
      return (
        <Menu {...menuProps}>
          <List
            scrollToIndex={props.activeIndex || 0}
            scrollToAlignment="auto"
            height={results.length < 5 ? results.length * itemHeight * 2 : 300}
            itemCount={results.length}
            itemSize={itemHeight}
            renderItem={({ index, style }) => {
              const item = results[index];
              var splitData = item.split(";");
              return (
                <MenuItem
                  style={{
                    whiteSpace: "pre-wrap",
                    borderBottom: "solid .5px #ebebeb",
                  }}
                  key={splitData[2]}
                  option={splitData[2]}
                  position={index}
                >
                  <Fragment>
                    <Highlighter search={props.text}>
                      {splitData[2]}
                    </Highlighter>
                    <div>
                      <small>
                        {splitData[1]} ({splitData[0]})
                      </small>
                    </div>
                  </Fragment>
                </MenuItem>
              );
            }}
          />
          {tooManyResults === true ? (
            <MenuItem
                  style={{
                    whiteSpace: "pre-wrap",
                    borderBottom: "solid .5px #ebebeb",
                  }}
                  
                >
                  <Fragment>
                    <Highlighter>
                      Too many results...
                    </Highlighter>
                    <div>
                      <small>
                       Keep typing to narrow your search.
                      </small>
                    </div>
                  </Fragment>
                </MenuItem>
          ) : (
            <div></div>
          )}
        </Menu>
      );
    } else {
      return (
        <Menu {...menuProps}>
          <MenuItem
            style={{
              whiteSpace: "pre-wrap",
              borderBottom: "solid .5px #ebebeb",
            }}
          >
            <Fragment>
              <Highlighter>No results found.</Highlighter>
              <div>
                <small>Try searching for a different airport.</small>
              </div>
            </Fragment>
          </MenuItem>
        </Menu>
      );
    }
  });

  return (
    <main className="padded" id="Home__splash">
      <Container fluid className="Home__container">
        <div id="Home__top">
          <Row>
            <Col id="Home__triage">
              <Tabs defaultActiveKey="flight" transition={false}>
                <Tab eventKey="flight" title="Flight">
                  <div className="Home__triage-container">
                    <Form>
                      <Row className="Home__triage-input-wrapper">
                        <Col lg="5" className="Home__triage-input">
                          <Typeahead
                            selected={singleSelections}
                            labelKey={option => `${option.airportName}`}
                            minLength={2}
                            id="pagination-example"
                            className="Home__input"
                            maxResults={6}
                            highlightOnlyResult={true}
                            options={options}
                            paginate={false}
                            placeholder="From"
                            renderMenuItemChildren={(result, props, index) => (
    <div key={index} className="small m-0 p-0">
      <p className="m-0 p-0">{result.airportName}</p>
      <p className="m-0 p-0">{result.airportName} {result.airportName}</p>                   
    </div>
  )}
                          />
                        </Col>
                        <Col lg="5" className="Home__triage-input">
                          <Form.Control
                            className="Home__input"
                            placeholder="To"
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
          <Row>
            <Col lg={7}>
              <Jumbotron id="Home__head-wrapper">
                <h1>Banana for scale.</h1>
                <p>
                  Radiation is everywhere and can be quite tricky to grasp. Take
                  a look around to put some common sources of radiation exposure
                  into context.
                </p>
                <p>
                  <Button variant="primary">Learn more</Button>
                </p>
              </Jumbotron>
            </Col>
            <Col lg={1} />
            <Col lg={4}>
              <img
                alt=""
                id="Home__head-img"
                src="https://loremflickr.com/400/266/banana"
              />
            </Col>
          </Row>
        </div>

        <Row id="Home__header">
          <Col lg={6}>
            <img
              alt=""
              id="Home__head-img"
              src="https://loremflickr.com/400/266/banana"
            />
          </Col>
          <Col lg={6}>
            <Jumbotron id="Home__splash-body">
              <h2>Radioactive Bananas?</h2>
              <p>
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

        <div id="Home__section">
          <h2>
            Radiation through History{" "}
            <Badge variant="secondary">Coming Soon</Badge>
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
        </div>
      </Container>
    </main>
  );
}

export default Home;