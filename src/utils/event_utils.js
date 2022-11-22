// get the dimension of event based on duration
export const get_event_dimension = ({
  duration,
  start,
  hour_slot_height_by_pixel,
}) => {
  try {
    const splited_time = start.split(":");
    const hour = parseInt(splited_time[0]);
    const min = parseInt(splited_time[1]);

    const event_top_by_pixel =
      10 +
      hour * hour_slot_height_by_pixel +
      min * (hour_slot_height_by_pixel / 60) -
      9 * hour_slot_height_by_pixel;
    const event_height_by_pixel = duration * (hour_slot_height_by_pixel / 60);

    return {
      top: event_top_by_pixel + "px",
      height: event_height_by_pixel + "px",
    };
  } catch (err) {
    return {
      top: 0,
      height: 0,
    };
  }
};
