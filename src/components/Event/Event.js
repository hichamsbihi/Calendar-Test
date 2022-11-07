import "./style.scss";

import React from "react";
import { get_event_dimension } from "./core/EventManager";

export default Event = ({
  id,
  start,
  duration,
  data_body,
  style,
  hour_slot_height_by_pixel,
}) => {
  const starttime_sub_text = "start time : " + start;
  const duration_sub_text = "Duration: " + duration + " min";

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
      onClick={() => {
        // hna ndiro chi logique dl hover wla click
      }}
    >
      <div className="event-main-text"> ID : {id}</div>
      <div className="event-main-text">{starttime_sub_text}</div>
      <div className="event-main-text">{duration_sub_text}</div>

      {data_body && <span>{data_body}</span>}
    </button>
  );
};
