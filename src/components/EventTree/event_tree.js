import "./style.scss";
import React from "react";
import { Event } from "../Event/event";

import {
  get_hours_of_day,
  render_timeline_dividers,
  render_events,
} from "../../utils/event_tree_utils";
// calculcate the position of events and Display them  font inputs
export const Event_tree = ({ global_height, global_width, events_array }) => {
  const hours_of_day = get_hours_of_day();
  const hour_slot_height_by_pixel = global_height / 12;
  const horizontal_line_width = global_width - 59;

  return (
    <div
      className="eventTree-container"
      style={{
        width: global_width + "px",
        height: parseInt(global_height) + 15 + "px",
      }}
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

      {render_events({
        hour_slot_height_by_pixel,
        events_array,
        global_width,
        Event,
      })}
    </div>
  );
};
