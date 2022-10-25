export const get_event_dimension = ({
  duration,
  start,
  hour_slot_height_by_pixel,
}) => {
  try {
    let splited_time = start.split(":");
    let _hour = parseInt(splited_time[0]);
    let _min = parseInt(splited_time[1]);

    let event_top_by_pixel =
      10 +
      _hour * hour_slot_height_by_pixel +
      _min * (hour_slot_height_by_pixel / 60);
    let event_height_by_pixel = duration * (hour_slot_height_by_pixel / 60);

    return {
      top: event_top_by_pixel + "px",
      height: event_height_by_pixel + "px",
    };
  } catch (err) {
    console.log("error occured on EventManager func(get_event_height");
    console.log(err);
    return {
      top: 0,
      height: 0,
    };
  }
};
