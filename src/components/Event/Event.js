import "./style.scss";

import React from "react";
import { GetEventDimension } from "../../utils/EventUtils";

export const Event = ({
  id,
  start,
  duration,
  dataBody,
  style,
  hourSlotHeightByPixel,
}) => {
  const starttimeSubText = "start time : " + start;
  const durationSubText = "duration: " + duration + " min";

  const { top, height } = GetEventDimension({
    duration,
    start,
    hourSlotHeightByPixel,
  });

  return (
    <button
      key={"event-" + id}
      className="event-item"
      style={{ ...style, top, height }}
    >
      <div className="event-main-text"> ID : {id}</div>
      <div className="event-main-text">{starttimeSubText}</div>
      <div className="event-main-text">{durationSubText}</div>

      {dataBody && <span>{dataBody}</span>}
    </button>
  );
};
