export const get_hours_of_day = () => {
  const hours_of_day = {};

  for (var cpt = 0; cpt < 24; cpt++)
    hours_of_day[cpt] = cpt < 10 ? "0" + cpt + ":00" : cpt + ":00";

  return hours_of_day;
};

const time_comparator = (time1, time2) => {
  const temp_date = new Date();
  temp_date.setHours(parseInt(time1.split(":")[0]));
  temp_date.setMinutes(parseInt(time1.split(":")[1]));
  temp_date.setSeconds(0);

  const temp_date1 = new Date();
  temp_date1.setHours(parseInt(time2.split(":")[0]));
  temp_date1.setMinutes(parseInt(time2.split(":")[1]));
  temp_date1.setSeconds(0);

  return temp_date < temp_date1 ? -1 : 1;
};

export const get_events_by_col = (events_table) => {
  let sorted_events_by_start_time = events_table.sort((a, b) =>
    time_comparator(a.start, b.start)
  );
  let columns_wrapper = {};

  const to_minutes = (time_str) => {
    return (
      parseInt(time_str.split(":")[0]) * 60 + parseInt(time_str.split(":")[1])
    );
  };

  const isOverLaps = (event1, event2) => {
    if (time_comparator(event2.start, event1.start) < 0)
      return isOverLaps(event2, event1);

    let event1_duration_by_min = to_minutes(event1.start) + event1.duration;
    let event2_starttime_by_min = to_minutes(event2.start);

    return event2_starttime_by_min < event1_duration_by_min;
  };

  const insert_event = (event, current_col_idx) => {
    if (!columns_wrapper[current_col_idx]) {
      columns_wrapper[current_col_idx] = [
        { ...event, level: current_col_idx + 1 },
      ];
      return current_col_idx + 1;
    }
    let last_event_from_current_col = columns_wrapper[current_col_idx].at(-1);
    if (!isOverLaps(event, last_event_from_current_col)) {
      columns_wrapper[current_col_idx].push({
        ...event,
        level: current_col_idx + 1,
      });
      return current_col_idx + 1;
    }
    let sub_level = insert_event(event, current_col_idx + 1);
    if (last_event_from_current_col.level) {
      if (last_event_from_current_col.level < sub_level)
        last_event_from_current_col.level = sub_level;
    } else last_event_from_current_col.level = sub_level;

    return sub_level;
  };

  sorted_events_by_start_time.forEach((event) => {
    insert_event(event, 0);
  });

  return {
    columns_wrapper,
    sorted_events_by_starttime: sorted_events_by_start_time,
  };
};
