import "./style.scss";

import React from "react";
import { get_event_dimension } from "../../utils/event_utils";

export const Event = ({
  id,
  start,
  duration,
  data_body,
  style,
  hour_slot_height_by_pixel,
}) => {
  const starttime_sub_text = "start time : " + start;
  const duration_sub_text = "duration: " + duration + " min";

  const { top, height } = get_event_dimension({
    duration,
    start,
    hour_slot_height_by_pixel,
  });

  return (
    <button
      key={"event-" + id}
      className="event-item"
      style={{ ...style, top, height }}
    >
      <div className="event-main-text"> ID : {id}</div>
      <div className="event-main-text">{starttime_sub_text}</div>
      <div className="event-main-text">{duration_sub_text}</div>

      {data_body && <span>{data_body}</span>}
    </button>
  );
};
