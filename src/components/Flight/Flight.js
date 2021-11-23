// based on https://github.com/joshwnj/react-visibility-sensor/issues/118
// by https://github.com/carloquilala

import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Row from "react-bootstrap/Row";
import Rive from "rive-react";
import { useRive } from "rive-react";
import VisibilitySensor from "react-visibility-sensor";
import { useLocation } from "react-router-dom";
import airportLocation from "../../csv/airport-location.csv";
import "./Flight.css";

function Flight() {
  const [unit, setUnit] = useState(1);
  const [flightDistance, setFlightDistance] = useState(0);
  const [radiationExposure, setRadiationExposure] = useState(0);
  const [flightTime, setFlightTime] = useState(0);
  const [numBananas, setNumBananas] = useState(0);
  const [toCode, setToCode] = useState("");
  const [fromCode, setFromCode] = useState("");

  const location = useLocation();
  let airports;

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(airportLocation, { mode: "no-cors" })
      .then((res) => res.text())
      .then((text) => CSVToArray(text, airports));
    AOS.init({
      duration: 250,
      disable: "mobile",
      offset: 100,
      easing: "ease-in-out-quart",
    });
  }, []);

  // Return array of string values, or NULL if CSV string not well formed.
  function CSVToArray(csv, airports) {
    let rows = csv.split("\n");
    rows = rows.map(function (row) {
      return row.split(",");
    });
    airports = rows;
    calculateRadiation(airports);
  }

  function toggleUnits() {
    setUnit(-unit);
  }

  function estimatedFlightTime(flightDistance) {
    let time = flightDistance / 500;
    setFlightTime(Math.ceil(time * 2) / 2);
  }

  function calculateRadiation(airports) {
    const query = new URLSearchParams(location.search);
    let from = decodeAirport(query.get("f"));
    let to = decodeAirport(query.get("t"));

    from = airports[parseInt(from)];
    to = airports[parseInt(to)];

    if (from == undefined) {
      alert("Missing from location!");
    } else {
      setFromCode(from[1]);
      setToCode(to[1]);

      let fromLat = ConvertDMSToDD(
        parseInt(from[5]),
        parseInt(from[6]),
        parseInt(from[7]),
        from[8]
      );
      let fromLong = ConvertDMSToDD(
        parseInt(from[9]),
        parseInt(from[10]),
        parseInt(from[11]),
        from[12]
      );

      let toLat = ConvertDMSToDD(
        parseInt(to[5]),
        parseInt(to[6]),
        parseInt(to[7]),
        to[8]
      );
      let toLong = ConvertDMSToDD(
        parseInt(to[9]),
        parseInt(to[10]),
        parseInt(to[11]),
        to[12]
      );

      let flightDistance = haversineDistance(fromLat, fromLong, toLat, toLong);
      setFlightDistance(flightDistance);
      estimatedFlightTime(flightDistance);
    }
  }

  const haversineDistance = (lat1, lon1, lat2, lon2, isMiles = true) => {
    const toRadian = (angle) => (Math.PI / 180) * angle;
    const distance = (a, b) => (Math.PI / 180) * (a - b);
    const RADIUS_OF_EARTH_IN_KM = 6371;

    const dLat = distance(lat2, lat1);
    const dLon = distance(lon2, lon1);

    lat1 = toRadian(lat1);
    lat2 = toRadian(lat2);

    // Haversine Formula
    const a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.asin(Math.sqrt(a));

    let finalDistance = RADIUS_OF_EARTH_IN_KM * c;

    if (isMiles) {
      finalDistance /= 1.60934;
    }

    return Math.floor(finalDistance);
  };

  function ConvertDMSToDD(degrees, minutes, seconds, direction) {
    var dd = degrees + minutes / 60 + seconds / (60 * 60);

    if (direction == "S" || direction == "W") {
      dd = dd * -1;
    } // Don't do anything for N or E
    return dd;
  }

  function decodeAirport(input) {
    let buff = new Buffer(input, "base64");
    return buff.toString("ascii");
  }

  const params = {
    src: require("./../../img/trip.riv").default,
    autoplay: false,
  };

  const { RiveComponent, rive } = useRive(params);

  function onButtonClick(isVisible) {
    if (rive) {
      if (isVisible) {
        rive.play();
      } else {
        rive.pause();
      }
    }
  }

  const generateBananas = (numBananas) => {
    let content = [];
    for (let i = 0; i < numBananas; i++) {
      content.push(
        <div key={i}>
          <img
            className="bananaImg"
            src="https://upload.wikimedia.org/wikipedia/commons/f/f7/Bananas.svg"
          />
        </div>
      );
    }
    return content;
  };

  return (
    <main id="Flight">
      <Container fluid className="bg-blue full-height">
        <Row className="h-100" data-aos="fade-up">
          <Col sm={{ span: 8, offset: 1 }}>
            <Jumbotron className="h-100 text-light d-flex align-items-center justify-content-center">
              <h1 className="size-1">
                How much radiation am I exposed to while flying?
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <div className="airplane">
          <img alt="" src="https://i.ibb.co/SPpRcJz/airplane.png" />
        </div>
        <div className="mountains">
          <div style={{ position: "relative", height: "100%" }}>
            <div
              className="clouds"
              style={{
                width: "100%",
                position: "absolute",
                bottom: "0",
                height: "45px",
                backgroundImage: 'url("./svg.svg")',
              }}
            />
          </div>
        </div>
      </Container>

      <Container fluid className="bg-white section-padding">
        <Row data-aos="fade-up" id="Flight__3-wrapper">
          <Col sm={{ span: 12 }} lg={{ span: 6, offset: 1 }}>
            <Jumbotron className="Flight__body">
              <h2>Background</h2>
              <p id="stats-desc">
                Most commercial planes fly anywhere from about{" "}
                {unit === 1
                  ? "ten to thirteen kilometers"
                  : "six to eight miles"}{" "}
                above sea level. As the airplane gets higher and higher, the
                atmosphere gets thinner and thinner. Without as much atmosphere
                to protect you, you'll receive higher exposure to radiation.
              </p>
            </Jumbotron>
          </Col>
          <Col sm={{ span: 1, offset: 11 }} lg={{ span: 2, offset: 3 }}>
            <Button onClick={toggleUnits} variant="outline-dark">
              {unit === 1 ? "Toggle Units 🌎" : "Toggle Units 🇺🇸"}
            </Button>{" "}
          </Col>
        </Row>

        <Row
          data-aos="fade-up"
          id="Flight__2-wrapper"
          className="flight-location align-items-center"
        >
          <Col md={{ span: 4, offset: 0 }}>
            <h2 className="text-end p-5 size-2">{fromCode}</h2>
          </Col>
          <Col md={{ span: 4, offset: 0 }}>
            <VisibilitySensor
              partialVisibility
              offset={{ top: 10 }}
              onChange={(isVisible) => onButtonClick(isVisible)}
            >
              <div style={{ height: "500px" }}>
                <RiveComponent />
              </div>
            </VisibilitySensor>
            {/* <Rive style={{height: "500px"}} src={require("./../../img/trip.riv").default} /> */}
          </Col>
          <Col md={{ span: 4, offset: 0 }}>
            <h2 className="size-2 p-5">{toCode}</h2>
          </Col>
        </Row>

        <Row data-aos="fade-up" className="justify-content-center">
          <Col lg={{ span: 3, offset: 0 }}>
            <Jumbotron className="text-center">
              <h3 className="size-4">
                {unit === 1
                  ? Math.round(flightDistance * 1.60934) + " km"
                  : flightDistance + " mi"}
              </h3>
              <p>Flight distance</p>
            </Jumbotron>
          </Col>
          <Col lg={{ span: 4, offset: 0 }}>
            <Jumbotron className="text-center">
              <h3 className="size-3">
                {parseFloat(0.003 * flightTime).toFixed(4)} mSv
              </h3>
              <p>Estimated radiation exposure (millisieverts)</p>
            </Jumbotron>
          </Col>
          <Col lg={{ span: 3, offset: 0 }}>
            <Jumbotron className="text-center">
              <h3 className="size-4">
                {Math.floor(flightTime) == 0 ? "" : flightTime + " hour"}
                {flightTime > 1 ? "s " : ""}
                {flightTime - Math.floor(flightTime) !== 0 ? "30 minutes" : ""}
              </h3>
              <p>Estimated flight time</p>
            </Jumbotron>
          </Col>
        </Row>
      </Container>

      <Container fluid className="bg-yellow section-padding">
        <Row className="align-items-center" id="Flight__2-wrapper">
          <Col md={{ span: 5, offset: 1 }}>
            <Jumbotron
              data-aos="fade-up"
              style={{ color: "black" }}
              className="Flight__body"
            >
              <h2>What's a millisievert!?</h2>
              <p>
                Sieverts are a measure of how much radiation is absorbed into
                the body. No shade to Dr. Rolf Sievert, but sieverts can be
                tricky to understand without context. That's where the bananas
                come in.
              </p>

              <p>
                Bananas are loaded with potassium! A natural variant of
                potassium is potassium-40, a radioactive isotope. Since bananas
                are slightly radioactive, we can use them as a unit to measure
                radiation!
              </p>
            </Jumbotron>
          </Col>
          <Col md={{ span: 5, offset: 1 }}></Col>
        </Row>

        <Row
          id="Flight__2-wrapper"
          className="align-items-center pt-5 justify-content-lg-center"
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
              <h2>.01 microsieverts</h2>
            </Jumbotron>
          </Col>
        </Row>
      </Container>

      <Container fluid className="section-padding bg-brown">
        <Row
          id="Flight__2-wrapper"
          id="bananaStatWrapper"
          className="justify-content-lg-center"
        >
          <Col lg={{ span: 7, offset: 0 }}>
            <div
              data-aos="fade-up"
              style={{ color: "white" }}
              className="text-center"
            >
              <div className="lead">So, your flight exposed you to about</div>
              <div className="size-3">
                {Math.ceil(Math.ceil(flightTime * 30))} bananas
              </div>
              <div className="lead">worth of radiation.</div>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-lg-center pt-5">
          <Col lg={{ span: 10, offset: 0 }}>
            <div className="bananaWrapper">
              {generateBananas(Math.ceil(flightTime * 30))}
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Flight;
