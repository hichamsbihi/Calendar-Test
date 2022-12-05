// displaying the calendar timemline
export const EenderTimelineDividers = ({
  hoursOfDay,
  hourSlotHeightByPixel,
  horizontalLineWidth,
}) => {
  return Object.entries(hoursOfDay).map((hour) => {
    return (
      <div
        key={"timeId-" + hour[0]}
        className="text-hours-span"
        style={{
          display: "inline-flex",
          alignItems: "center",
          top: hour[0] * hourSlotHeightByPixel - 9 * hourSlotHeightByPixel,
        }}
      >
        <span>{hour[1]}</span>
        <div
          className="horizontal-divider-line"
          style={{ borderLeft: horizontalLineWidth + "px solid gray" }}
        ></div>
      </div>
    );
  });
};

export const RenderEvents = ({
  hourSlotHeightByPixel,
  eventsArray,
  globalWidth,
  Event,
}) => {
  // the global width of events screen  (we retreived the 50 pixel of time span in the left)
  const containerWidth = globalWidth - 55;
  const initLeftByPx = 57;

  const { timelineMapper } = getEventsByCol(eventsArray);

  return Object.entries(timelineMapper).map((colPair) => {
    const levelNbr = colPair[1].length;
    const eventWidth = containerWidth / levelNbr;
    return colPair[1].map((eventarray, idx) => {
      return eventarray.map((event) => (
        <Event
          id={event.id}
          key={"event" + event.id}
          start={event.start}
          duration={event.duration}
          dataBody={event.data || null}
          style={{
            width: eventWidth + "px",
            left: initLeftByPx + idx * eventWidth + "px",
          }}
          hourSlotHeightByPixel={hourSlotHeightByPixel}
        />
      ));
    });
  });
};

export const getHoursOfDay = () => {
  const hoursOfDay = {};

  for (let cpt = 9; cpt < 22; cpt++)
    hoursOfDay[cpt] = cpt < 10 ? "0" + cpt + ":00" : cpt + ":00";

  return hoursOfDay;
};

const timeComparator = (time1, time2) => {
  const tempDate = new Date();
  tempDate.setHours(parseInt(time1.split(":")[0]));
  tempDate.setMinutes(parseInt(time1.split(":")[1]));
  tempDate.setSeconds(0);

  const tempDate1 = new Date();
  tempDate1.setHours(parseInt(time2.split(":")[0]));
  tempDate1.setMinutes(parseInt(time2.split(":")[1]));
  tempDate1.setSeconds(0);

  return tempDate < tempDate1 ? -1 : 1;
};

const toMinutes = (timeStr) => {
  return parseInt(timeStr.split(":")[0]) * 60 + parseInt(timeStr.split(":")[1]);
};

const isOverLaps = (event1, event2) => {
  if (timeComparator(event2.start, event1.start) < 0)
    return isOverLaps(event2, event1);

  const event1DurationByMin = toMinutes(event1.start) + event1.duration;
  const event2StarttimeByMin = toMinutes(event2.start);

  return event2StarttimeByMin < event1DurationByMin;
};
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
// check existing of events in specific time slot
const isIntervalContainsEvent = (sourceInterval, eventIntervalStr) => {
  let isInside = 0,
    newInterval = sourceInterval;

  const eventMinutesStart = parseInt(eventIntervalStr.split("|")[0]);
  const eventMinutesEnd = parseInt(eventIntervalStr.split("|")[1]);

  const sourceMinutesStart = parseInt(sourceInterval.split("|")[0]);
  const sourceMinutesEnd = parseInt(sourceInterval.split("|")[1]);

  if (eventMinutesEnd <= sourceMinutesEnd) isInside = 1;
  else if (eventMinutesStart < sourceMinutesEnd) {
    isInside = 2;
    newInterval = sourceMinutesStart + "|" + eventMinutesEnd;
  }

  return {
    newInterval,
    isInside,
  };
};

export const getEventsByCol = (eventsTable) => {
  const sortedEventsByStartTime = eventsTable.sort((a, b) =>
    timeComparator(a.start, b.start)
  );
  const timelineMapper = {};

  const insertByColumn = (event, colArray) => {
    let isPacked = false;

    colArray.forEach((col_) => {
      if (isPacked) return;
      let lastEventFromCurrentCol = col_.at(-1);
      if (!isOverLaps(event, lastEventFromCurrentCol)) {
        col_.push(event);
        isPacked = true;
      }
    });
    if (!isPacked) colArray.push([event]);
    return;
  };
  // inserting event in it's inteervalle based on start time and duration
  const insertEvent = (event) => {
    const eventIntervalByMinute = toMinutes(event.start) + event.duration;
    const eventIntervalStr =
      toMinutes(event.start) + "|" + eventIntervalByMinute;
    let eventInserted = false;
    const keysIntervalsToChange = {};

    Object.entries(timelineMapper).forEach((timeInterval) => {
      if (eventInserted) return;

      const { newInterval, isInside } = isIntervalContainsEvent(
        timeInterval[0],
        eventIntervalStr
      );

      if (isInside === 1) {
        insertByColumn(event, timeInterval[1]);
        eventInserted = true;
      } else if (isInside === 2) {
        insertByColumn(event, timeInterval[1]);
        eventInserted = true;
        keysIntervalsToChange[timeInterval[0]] = newInterval;
      }
    });
    if (!eventInserted) {
      timelineMapper[eventIntervalStr] = [[event]];
      return;
    }
    Object.keys(keysIntervalsToChange).forEach((__key) => {
      timelineMapper[keysIntervalsToChange[__key]] = timelineMapper[__key];
      delete timelineMapper[__key];
    });
    return;
  };

  sortedEventsByStartTime.forEach((event) => {
    insertEvent(event);
  });

  return {
    timelineMapper,
    sortedEventsByStarttime: sortedEventsByStartTime,
  };
};
