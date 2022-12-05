import "./index.css";
import React, { useState } from "react";
import "antd/dist/antd.min.css";

import INPUTS from "./inputs.json";
import { EventTree } from "./components/EventTree/EventTree";
import { Slider, Row, Col } from "antd";

const App = () => {
  const [calendarheight, setcalendarheight] = useState(2000);
  const [calendarwidth, setcalendarwidth] = useState(window.innerWidth);

  return (
    <>
      <h2 className="title"> Mon calendrier</h2>
      <Row className="global-container" align="middle" justify="center">
        <Col span={12} className="parameters-container">
          <div>
            <span> Height</span>
            <Slider
              min={200}
              max={4000}
              value={calendarheight}
              onChange={(value) => setcalendarheight(value)}
              step={100}
            />
          </div>
          <div>
            <span> Width</span>
            <Slider
              min={200}
              max={2000}
              value={calendarwidth}
              onChange={(value) => setcalendarwidth(value)}
              step={100}
            />
          </div>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <EventTree
            globalHeight={calendarheight.toString()}
            globalWidth={calendarwidth.toString()}
            eventsArray={INPUTS}
          />
        </Col>
      </Row>
    </>
  );
};

export default App;
