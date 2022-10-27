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

const is_interval_contains_event = (source_interval, event_interval_str) => {
  let event_minutes_start,
    event_minutes_end,
    source_minutes_start,
    source_minutes_end;
  let is_inside = 0,
    new_interval = source_interval;

  event_minutes_start = parseInt(event_interval_str.split("|")[0]);
  event_minutes_end = parseInt(event_interval_str.split("|")[1]);

  source_minutes_start = parseInt(source_interval.split("|")[0]);
  source_minutes_end = parseInt(source_interval.split("|")[1]);

  if (event_minutes_end <= source_minutes_end) is_inside = 1;
  else if (event_minutes_start < source_minutes_end) {
    is_inside = 2;
    new_interval = source_minutes_start + "|" + event_minutes_end;
  }

  /*
      case 0 :                       | case 1 : 
        source_event  start  *       |   source_event  start   *
                             |       |                         |
                             |       |                         |
                             |       |                         |
                        end  *       |                         |    *  start   <== comming event
                                     |                         |    |
        comming event  start *       |                         |    |
                             |       |                         |    |
                             |       |                         |    |
                             |       |                         |    * end
                             |       |                   end   *
                             |       |
                        end  *       |
                                     |
    */
  return {
    new_interval,
    is_inside,
  };
};

export const get_events_by_col = (events_table) => {
  let sorted_events_by_start_time = events_table.sort((a, b) =>
    time_comparator(a.start, b.start)
  );
  let timeline_mapper = {};

  const insert_by_column = (event, col_array) => {
    let is_packed = false;

    col_array.forEach((col_) => {
      if (is_packed) return;
      let last_event_from_current_col = col_.at(-1);
      if (!isOverLaps(event, last_event_from_current_col)) {
        col_.push(event);
        is_packed = true;
      }
    });
    if (!is_packed) col_array.push([event]);
    return;
  };

  const insert_event = (event) => {
    let event_interval_by_minute = to_minutes(event.start) + event.duration;
    let event_interval_str =
      to_minutes(event.start) + "|" + event_interval_by_minute;
    let event_inserted = false;
    let keys_intervals_to_change = {};

    Object.entries(timeline_mapper).forEach((time_interval) => {
      if (event_inserted) return;

      let { new_interval, is_inside } = is_interval_contains_event(
        time_interval[0],
        event_interval_str
      );

      if (is_inside === 1) {
        insert_by_column(event, time_interval[1]);
        event_inserted = true;
      } else if (is_inside === 2) {
        insert_by_column(event, time_interval[1]);
        event_inserted = true;
        keys_intervals_to_change[time_interval[0]] = new_interval;
      }
    });
    if (!event_inserted) {
      timeline_mapper[event_interval_str] = [[event]];
      return;
    }
    Object.keys(keys_intervals_to_change).forEach((__key) => {
      timeline_mapper[keys_intervals_to_change[__key]] = timeline_mapper[__key];
      delete timeline_mapper[__key];
    });
    return;
  };

  sorted_events_by_start_time.forEach((event) => {
    insert_event(event);
  });

  return {
    timeline_mapper,
    sorted_events_by_starttime: sorted_events_by_start_time,
  };
};
