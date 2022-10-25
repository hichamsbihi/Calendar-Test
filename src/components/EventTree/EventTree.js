import "./style.scss";
import React from "react";
import Event from "../Event/Event";

import { get_hours_of_day, get_events_by_col } from "./core/TreeManager";

const EventTree = ({ global_height, global_width, events_array }) => {
  const hours_of_day = get_hours_of_day();
  const hour_slot_height_by_pixel = global_height / 24;
  const horizontal_line_width = global_width - 50;

  console.log(get_events_by_col(events_array));

  const render_timeline_dividers = ({
    hours_of_day,
    hour_slot_height_by_pixel,
    horizontal_line_width,
  }) => {
    return Object.entries(hours_of_day).map((hour) => {
      return (
        <div
          key={"timeId-" + hour[0]}
          className="text-hours-span"
          style={{ top: hour[0] * hour_slot_height_by_pixel }}
        >
          <span>{hour[1]}</span>
          <div
            className="horizontal-divider-line"
            style={{ borderLeft: horizontal_line_width + "px solid gray" }}
          ></div>
        </div>
      );
    });
  };

  const render_events = ({ hour_slot_height_by_pixel, events_array }) => {
    // the global width of events screen  (we retreived the 50 pixel of time span in the left)
    const container_width = global_width - 50;
    const init_left_by_px = 60;

    const { columns_wrapper } = get_events_by_col(events_array);
    const columns_nbr = Object.keys(columns_wrapper).length;
    const event_width = container_width / columns_nbr;
    return Object.entries(columns_wrapper).map((col_pair) => {
      return col_pair[1].map((event) => (
        <Event
          id={event.id}
          key={"event" + event.id}
          start={event.start}
          duration={event.duration}
          data_body={event.data || null}
          style={{
            width: event_width + "px",
            left: init_left_by_px + col_pair[0] * event_width + "px",
          }}
          hour_slot_height_by_pixel={hour_slot_height_by_pixel}
        />
      ));
    });
  };

  return (
    <div
      className="eventTree-container"
      style={{ width: global_width + "px", height: global_height + "px" }}
    >
      <div
        className="vertical-hours-line"
        style={{ height: global_height + "px" }}
      ></div>

      {render_timeline_dividers({
        hours_of_day,
        horizontal_line_width,
        hour_slot_height_by_pixel,
      })}

      {render_events({ hour_slot_height_by_pixel, events_array })}
    </div>
  );
};

export default EventTree;
