// based on https://github.com/joshwnj/react-visibility-sensor/issues/118
// by https://github.com/carloquilala

import React, { useState, useEffect } from "react";
import VisibilitySensor from "react-visibility-sensor";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "aos/dist/aos.css";
import AOS from "aos";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./Flight.css";

function Flight() {
  const [unit, setUnit] = useState(1);
  const [numBananas, setNumBananas] = useState(720);
  const distance = 4000;

  function changeBg(sectionNumber) {
    console.log("Changed: " + sectionNumber);
    switch (sectionNumber) {
      case 1:
        document.body.style.backgroundColor = "#007AF5";
        break;
      case 2:
        document.body.style.backgroundColor = "#007AF5";
        break;
      case 3:
        document.body.style.backgroundColor = "#FDD535";
        break;
      case 4:
        document.body.style.backgroundColor = "#463E35";
        break;
      default:
        console.log(sectionNumber);
    }
  }

  const generateBananas = () => {
    let content = [];
    for (let i = 0; i < numBananas; i++) {
      content.push(
        <div key={i}>
          <img
           alt=""
            className="bananaImg"
            src="https://upload.wikimedia.org/wikipedia/commons/f/f7/Bananas.svg"
          />
        </div>
      );
    }
    return content;
  };

  function toggleUnits() {
    setUnit(-unit);
  }

  useEffect(() => {
    document.body.style.backgroundColor = "#007AF5";

    AOS.init({
      duration: 250,
      disable: "mobile",
      offset: 100,
      easing: "ease-in-out-quart",
    });
  }, []);

  return (
    <main className="full-width" id="Flight">
      <VisibilitySensor
        partialVisibility
        onChange={(isVisible) => (isVisible ? changeBg(1) : null)}
        offset={{ top: 0 }}
      >
        {({ isVisible }) => (
          <div>
            <div className="colorSection">
              {/*<Jumbotron className="Flight__body">
                    <h2 className="center-text">How much radiation am I exposed to in an airplane?</h2>
                    
                  </Jumbotron>*/}

              <div className="sky">
                <Row data-aos="fade-up" id="Flight__2-wrapper">
                  <Col lg={{ span: 5, offset: 1 }}>
                    <Jumbotron className="Flight__body">
                      <h2>How much radiation am I exposed to while flying?</h2>
                    </Jumbotron>
                  </Col>
                </Row>

                <div className="airplane">
                  <img  alt="" src="https://i.ibb.co/SPpRcJz/airplane.png" />
                </div>

                <div className="mountains"></div>
              </div>
              <div className="divider-row red">
                <svg
                  id=""
                  preserveAspectRatio="xMidYMax meet"
                  className="svg-separator sep1"
                  viewBox="0 0 1600 100"
                  data-height="100"
                >
                  <path
                    style={{ opacity: 1, fill: "#f2f2f2" }}
                    d="M1040,56c0.5,0,1,0,1.6,0c-16.6-8.9-36.4-15.7-66.4-15.7c-56,0-76.8,23.7-106.9,41C881.1,89.3,895.6,96,920,96
C979.5,96,980,56,1040,56z"
                  ></path>
                  <path
                    style={{ opacity: 1, fill: "#fff" }}
                    d="M1699.8,96l0,10H1946l-0.3-6.9c0,0,0,0-88,0s-88.6-58.8-176.5-58.8c-51.4,0-73,20.1-99.6,36.8
c14.5,9.6,29.6,18.9,58.4,18.9C1699.8,96,1699.8,96,1699.8,96z"
                  ></path>
                  <path
                    style={{ opacity: 1, fill: "#f2f2f2" }}
                    d="M1400,96c19.5,0,32.7-4.3,43.7-10c-35.2-17.3-54.1-45.7-115.5-45.7c-32.3,0-52.8,7.9-70.2,17.8
c6.4-1.3,13.6-2.1,22-2.1C1340.1,56,1340.3,96,1400,96z"
                  ></path>
                  <path
                    style={{ opacity: 1, fill: "#f2f2f2" }}
                    d="M320,56c6.6,0,12.4,0.5,17.7,1.3c-17-9.6-37.3-17-68.5-17c-60.4,0-79.5,27.8-114,45.2
c11.2,6,24.6,10.5,44.8,10.5C260,96,259.9,56,320,56z"
                  ></path>
                  <path
                    style={{ opacity: 1, fill: "#f2f2f2" }}
                    d="M680,96c23.7,0,38.1-6.3,50.5-13.9C699.6,64.8,679,40.3,622.2,40.3c-30,0-49.8,6.8-66.3,15.8
c1.3,0,2.7-0.1,4.1-0.1C619.7,56,620.2,96,680,96z"
                  ></path>
                  <path
                    style={{ opacity: 1, fill: "#f2f2f2" }}
                    d="M-40,95.6c28.3,0,43.3-8.7,57.4-18C-9.6,60.8-31,40.2-83.2,40.2c-14.3,0-26.3,1.6-36.8,4.2V106h60V96L-40,95.6
z"
                  ></path>
                  <path
                    style={{ opacity: 1, fill: "#fff" }}
                    d="M504,73.4c-2.6-0.8-5.7-1.4-9.6-1.4c-19.4,0-19.6,13-39,13c-19.4,0-19.5-13-39-13c-14,0-18,6.7-26.3,10.4
C402.4,89.9,416.7,96,440,96C472.5,96,487.5,84.2,504,73.4z"
                  ></path>
                  <path
                    style={{ opacity: 1, fill: "#fff" }}
                    d="M1205.4,85c-0.2,0-0.4,0-0.6,0c-19.5,0-19.5-13-39-13s-19.4,12.9-39,12.9c0,0-5.9,0-12.3,0.1
c11.4,6.3,24.9,11,45.5,11C1180.6,96,1194.1,91.2,1205.4,85z"
                  ></path>
                  <path
                    style={{ opacity: 1, fill: "#fff" }}
                    d="M1447.4,83.9c-2.4,0.7-5.2,1.1-8.6,1.1c-19.3,0-19.6-13-39-13s-19.6,13-39,13c-3,0-5.5-0.3-7.7-0.8
c11.6,6.6,25.4,11.8,46.9,11.8C1421.8,96,1435.7,90.7,1447.4,83.9z"
                  ></path>
                  <path
                    style={{ opacity: 1, fill: "#fff" }}
                    d="M985.8,72c-17.6,0.8-18.3,13-37,13c-19.4,0-19.5-13-39-13c-18.2,0-19.6,11.4-35.5,12.8
c11.4,6.3,25,11.2,45.7,11.2C953.7,96,968.5,83.2,985.8,72z"
                  ></path>
                  <path
                    style={{ opacity: 1, fill: "#fff" }}
                    d="M743.8,73.5c-10.3,3.4-13.6,11.5-29,11.5c-19.4,0-19.5-13-39-13s-19.5,13-39,13c-0.9,0-1.7,0-2.5-0.1
c11.4,6.3,25,11.1,45.7,11.1C712.4,96,727.3,84.2,743.8,73.5z"
                  ></path>
                  <path
                    style={{ opacity: 1, fill: "#fff" }}
                    d="M265.5,72.3c-1.5-0.2-3.2-0.3-5.1-0.3c-19.4,0-19.6,13-39,13c-19.4,0-19.6-13-39-13
c-15.9,0-18.9,8.7-30.1,11.9C164.1,90.6,178,96,200,96C233.7,96,248.4,83.4,265.5,72.3z"
                  ></path>
                  <path
                    style={{ opacity: 1, fill: "#fff" }}
                    d="M1692.3,96V85c0,0,0,0-19.5,0s-19.6-13-39-13s-19.6,13-39,13c-0.1,0-0.2,0-0.4,0c11.4,6.2,24.9,11,45.6,11
C1669.9,96,1684.8,96,1692.3,96z"
                  ></path>
                  <path
                    style={{ opacity: 1, fill: "#fff" }}
                    d="M25.5,72C6,72,6.1,84.9-13.5,84.9L-20,85v8.9C0.7,90.1,12.6,80.6,25.9,72C25.8,72,25.7,72,25.5,72z"
                  ></path>
                  <path
                    style={{ opacity: 1, fill: "#fff" }}
                    d="M-40,95.6C20.3,95.6,20.1,56,80,56s60,40,120,40s59.9-40,120-40s60.3,40,120,40s60.3-40,120-40
s60.2,40,120,40s60.1-40,120-40s60.5,40,120,40s60-40,120-40s60.4,40,120,40s59.9-40,120-40s60.3,40,120,40s60.2-40,120-40
s60.2,40,120,40s59.8,0,59.8,0l0.2,143H-60V96L-40,95.6z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        )}
      </VisibilitySensor>

      <div
        style={{ zIndex: "10000", position: "relative", paddingTop: "40vh", color: "black", backgroundColor: "white" }}
        className="colorSection"
      >
        <Row data-aos="fade-up" id="Flight__3-wrapper">
          <Col sm={{ span: 12 }} lg={{ span: 6, offset: 1 }}>
            <Jumbotron className="Flight__body">
              <h2>Background</h2>
              <p id="stats-desc">
                Most commercial planes fly anywhere from about{" "}
                {unit === 1
                  ? "ten to thirteen kilometers"
                  : "six to eight miles"}{" "}
                above sea level. As the plane gets higher and higher, the
                atmosphere gets thinner and thinner. Without as much atmosphere
                to protect you, you'll receive more radiation.
              </p>
            </Jumbotron>
          </Col>
          <Col sm={{ span: 1, offset: 11 }} lg={{ span: 2, offset: 3 }}>
            <Button
              className="sticky"
              style={{
                position: "sticky",
                marginTop: "4rem",
                top: "4rem",
              }}
              onClick={toggleUnits}
              variant="outline-dark"
            >
              {unit === 1 ? "Toggle Units 🌎" : "Toggle Units 🇺🇸"}
            </Button>{" "}
          </Col>
        </Row>

        <Row
          data-aos="fade-up"
          id="Flight__2-wrapper"
          className="justify-content-lg-center flight-location"
        >
          <Col lg={{ span: 4, offset: 0 }}>
            <h2 className="center-text airport">JFK</h2>
          </Col>
          <Col lg={{ span: 4, offset: 1 }}>
            <h2 className="center-text airport">ROC</h2>
          </Col>
        </Row>

        <Row
          data-aos="fade-up"
          style={{ marginTop: 48 }}
          id="Flight__3-wrapper"
          className="justify-content-lg-center"
        >
          <Col lg={{ span: 3, offset: 0 }}>
            <Jumbotron style={{color:"#2e2e2e"}} className="Flight__body center-text">
              <h2>
                {unit === 1
                  ? Math.round(distance * 1.60934) + " km"
                  : distance + " mi"}
              </h2>
              <p className="center-text distance-subtitle">Flight distance</p>
            </Jumbotron>
          </Col>
          <Col lg={{ span: 4, offset: 0 }}>
            <Jumbotron style={{color: "black", fontSize: "1.2rem"}} className="Flight__body center-text">
              <h2 style={{color: "black"}}>.0135 mSv</h2>
              <p style={{color: "black"}} className="center-text distance-subtitle">
                Estimated radiation exposure (millisieverts)
              </p>
            </Jumbotron>
          </Col>
          <Col lg={{ span: 3, offset: 0 }}>
            <Jumbotron style={{color:"#2e2e2e"}} className="Flight__body center-text">
              <h2>4.5 hours</h2>
              <p className="center-text distance-subtitle">Estimated flight time</p>
            </Jumbotron>
          </Col>

        </Row>
        <div className="divider-row red">
          <svg
            id=""
            preserveAspectRatio="xMidYMax meet"
            className="svg-separator sep1"
            viewBox="0 0 1600 100"
            data-height="100"
          >
            <path
              style={{ opacity: 1, fill: "#FDD535" }}
              d="M1040,56c0.5,0,1,0,1.6,0c-16.6-8.9-36.4-15.7-66.4-15.7c-56,0-76.8,23.7-106.9,41C881.1,89.3,895.6,96,920,96
C979.5,96,980,56,1040,56z"
            ></path>
            <path
              style={{ opacity: 1, fill: "#FDD535" }}
              d="M1699.8,96l0,10H1946l-0.3-6.9c0,0,0,0-88,0s-88.6-58.8-176.5-58.8c-51.4,0-73,20.1-99.6,36.8
c14.5,9.6,29.6,18.9,58.4,18.9C1699.8,96,1699.8,96,1699.8,96z"
            ></path>
            <path
              style={{ opacity: 1, fill: "#FDD535" }}
              d="M1400,96c19.5,0,32.7-4.3,43.7-10c-35.2-17.3-54.1-45.7-115.5-45.7c-32.3,0-52.8,7.9-70.2,17.8
c6.4-1.3,13.6-2.1,22-2.1C1340.1,56,1340.3,96,1400,96z"
            ></path>
            <path
              style={{ opacity: 1, fill: "#FDD535" }}
              d="M320,56c6.6,0,12.4,0.5,17.7,1.3c-17-9.6-37.3-17-68.5-17c-60.4,0-79.5,27.8-114,45.2
c11.2,6,24.6,10.5,44.8,10.5C260,96,259.9,56,320,56z"
            ></path>
            <path
              style={{ opacity: 1, fill: "#FDD535" }}
              d="M680,96c23.7,0,38.1-6.3,50.5-13.9C699.6,64.8,679,40.3,622.2,40.3c-30,0-49.8,6.8-66.3,15.8
c1.3,0,2.7-0.1,4.1-0.1C619.7,56,620.2,96,680,96z"
            ></path>
            <path
              style={{ opacity: 1, fill: "#FDD535" }}
              d="M-40,95.6c28.3,0,43.3-8.7,57.4-18C-9.6,60.8-31,40.2-83.2,40.2c-14.3,0-26.3,1.6-36.8,4.2V106h60V96L-40,95.6
z"
            ></path>
            <path
              style={{ opacity: 1, fill: "#FDD535" }}
              d="M504,73.4c-2.6-0.8-5.7-1.4-9.6-1.4c-19.4,0-19.6,13-39,13c-19.4,0-19.5-13-39-13c-14,0-18,6.7-26.3,10.4
C402.4,89.9,416.7,96,440,96C472.5,96,487.5,84.2,504,73.4z"
            ></path>
            <path
              style={{ opacity: 1, fill: "#FDD535" }}
              d="M1205.4,85c-0.2,0-0.4,0-0.6,0c-19.5,0-19.5-13-39-13s-19.4,12.9-39,12.9c0,0-5.9,0-12.3,0.1
c11.4,6.3,24.9,11,45.5,11C1180.6,96,1194.1,91.2,1205.4,85z"
            ></path>
            <path
              style={{ opacity: 1, fill: "#FDD535" }}
              d="M1447.4,83.9c-2.4,0.7-5.2,1.1-8.6,1.1c-19.3,0-19.6-13-39-13s-19.6,13-39,13c-3,0-5.5-0.3-7.7-0.8
c11.6,6.6,25.4,11.8,46.9,11.8C1421.8,96,1435.7,90.7,1447.4,83.9z"
            ></path>
            <path
              style={{ opacity: 1, fill: "#FDD535" }}
              d="M985.8,72c-17.6,0.8-18.3,13-37,13c-19.4,0-19.5-13-39-13c-18.2,0-19.6,11.4-35.5,12.8
c11.4,6.3,25,11.2,45.7,11.2C953.7,96,968.5,83.2,985.8,72z"
            ></path>
            <path
              style={{ opacity: 1, fill: "#FDD535" }}
              d="M743.8,73.5c-10.3,3.4-13.6,11.5-29,11.5c-19.4,0-19.5-13-39-13s-19.5,13-39,13c-0.9,0-1.7,0-2.5-0.1
c11.4,6.3,25,11.1,45.7,11.1C712.4,96,727.3,84.2,743.8,73.5z"
            ></path>
            <path
              style={{ opacity: 1, fill: "#FDD535" }}
              d="M265.5,72.3c-1.5-0.2-3.2-0.3-5.1-0.3c-19.4,0-19.6,13-39,13c-19.4,0-19.6-13-39-13
c-15.9,0-18.9,8.7-30.1,11.9C164.1,90.6,178,96,200,96C233.7,96,248.4,83.4,265.5,72.3z"
            ></path>
            <path
              style={{ opacity: 1, fill: "#FDD535" }}
              d="M1692.3,96V85c0,0,0,0-19.5,0s-19.6-13-39-13s-19.6,13-39,13c-0.1,0-0.2,0-0.4,0c11.4,6.2,24.9,11,45.6,11
C1669.9,96,1684.8,96,1692.3,96z"
            ></path>
            <path
              style={{ opacity: 1, fill: "#FDD535" }}
              d="M25.5,72C6,72,6.1,84.9-13.5,84.9L-20,85v8.9C0.7,90.1,12.6,80.6,25.9,72C25.8,72,25.7,72,25.5,72z"
            ></path>
            <path
              style={{ opacity: 1, fill: "#FDD535" }}
              d="M-40,95.6C20.3,95.6,20.1,56,80,56s60,40,120,40s59.9-40,120-40s60.3,40,120,40s60.3-40,120-40
s60.2,40,120,40s60.1-40,120-40s60.5,40,120,40s60-40,120-40s60.4,40,120,40s59.9-40,120-40s60.3,40,120,40s60.2-40,120-40
s60.2,40,120,40s59.8,0,59.8,0l0.2,143H-60V96L-40,95.6z"
            ></path>
          </svg>
        </div>
      </div>

      <div className="colorSection">
        <div>
          <Row
            style={{ backgroundColor: "#FDD535" }}
            className="align-items-center"
            id="Flight__2-wrapper"
          >
            <Col lg={{ span: 5, offset: 1 }}>
              <Jumbotron           data-aos="fade-up"
style={{ color: "black" }} className="Flight__body">
                <h2>What's a millisievert!?</h2>
                <p>
                  Sieverts are a measure of how much radiation is absorbed into
                  the body. No shade to Dr. Rolf Sievert, but sieverts are
                  tricky to understand without context. That's where the bananas
                  come in.
                </p>

                <p>
                  Bananas are loaded with potassium! A natural variant of
                  potassium is potassium-40, a radioactive isotope. Since
                  bananas are slightly radioactive, we can use them as a unit to
                  measure radiation!
                </p>
              </Jumbotron>
            </Col>
            <Col lg={{ span: 5, offset: 1 }}>
              <img alt="" className="left" src="https://loremflickr.com/400/266" />
            </Col>
          </Row>
        </div>

        <Row
          id="Flight__2-wrapper"
          style={{ backgroundColor: "#FDD535" }}
          className="align-items-center justify-content-lg-center"
        >
          <Col sm={{ span: 3, offset: 0 }}>
            <Jumbotron
              style={{ color: "black" }}
              className="Flight__body center-text"
            >
              <img
                alt=""
                className="bananaImg"
                style={{ height: "150px", width: "150px" }}
                src="https://upload.wikimedia.org/wikipedia/commons/f/f7/Bananas.svg"
              />
              <p className="center-text">1 Banana</p>
            </Jumbotron>
          </Col>
          <Col sm={{ span: 1, offset: 0 }}>
            <Jumbotron
              style={{ color: "black" }}
              className="Flight__body center-text"
            >
              <h2>=</h2>
            </Jumbotron>
          </Col>
          <Col sm={{ span: 4, offset: 0 }}>
            <Jumbotron
              style={{ color: "black" }}
              className="Flight__body center-text"
            >
              <h2>.01 millisieverts</h2>
            </Jumbotron>
          </Col>
        </Row>
      </div>

      <div className="colorSection">
        <Row
          style={{backgroundColor: "#463E35"}}
          id="Flight__2-wrapper"
          id="bananaStatWrapper"
          className="justify-content-lg-center"
        >
          <Col lg={{ span: 7, offset: 0 }}>
            <div           data-aos="fade-up"
 style={{ color: "white" }} className="banana-stat center-text">
              <p>Therefore, your flight exposed you to about</p>
              <div id="bananaHighlight">400 bananas</div>
              <p>worth of radiation.</p>
            </div>
          </Col>
        </Row>
        <Row
          style={{backgroundColor: "#463E35"}}
          id="Flight__2-wrapper"
          id="bananaStatWrapper"
          className="justify-content-lg-center"
        >
          <Col lg={{ span: 10, offset: 0 }}>
            <div className="bananaWrapper">{generateBananas()}</div>
          </Col>
        </Row>
      </div>
    </main>
  );
}

export default Flight;