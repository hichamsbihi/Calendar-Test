import "./style.scss";
import React from "react";
import { Event } from "../Event/Event";

import {
  getHoursOfDay,
  EenderTimelineDividers,
  RenderEvents,
} from "../../utils/EventTreeUtils";
// calculcate the position of events and Display them  font inputs
export const EventTree = ({ globalHeight, globalWidth, eventsArray }) => {
  const hoursOfDay = getHoursOfDay();
  const hourSlotHeightByPixel = globalHeight / 12;
  const horizontalLineWidth = globalWidth - 59;

  return (
    <div
      className="eventTree-container"
      style={{
        width: globalWidth + "px",
        height: parseInt(globalHeight) + 15 + "px",
      }}
    >
      <div
        className="vertical-hours-line"
        style={{ height: globalHeight + "px" }}
      ></div>

      {EenderTimelineDividers({
        hoursOfDay,
        horizontalLineWidth,
        hourSlotHeightByPixel,
      })}

      {RenderEvents({
        hourSlotHeightByPixel,
        eventsArray,
        globalWidth,
        Event,
      })}
    </div>
  );
};
