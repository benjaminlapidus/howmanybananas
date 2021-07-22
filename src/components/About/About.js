// based on https://github.com/joshwnj/react-visibility-sensor/issues/118
// by https://github.com/carloquilala

import React from "react";
import "./About.css";

function About() {
  return (
    <div id="About">
      <div className="sky">
        <div className="clouds"></div>

        <div className="airplane">
          <img alt="" src="https://i.ibb.co/SPpRcJz/airplane.png" />
          </div>

          <div className="mountains"></div>
        </div>
      </div>
  );
}

export default About;