// get the dimension of event based on duration
export const GetEventDimension = ({
  duration,
  start,
  hourSlotHeightByPixel,
}) => {
  try {
    const splitedTime = start.split(":");
    const hour = parseInt(splitedTime[0]);
    const min = parseInt(splitedTime[1]);

    const eventTopByPixel =
      10 +
      hour * hourSlotHeightByPixel +
      min * (hourSlotHeightByPixel / 60) -
      9 * hourSlotHeightByPixel;
    const eventHeightByPixel = duration * (hourSlotHeightByPixel / 60);

    return {
      top: eventTopByPixel + "px",
      height: eventHeightByPixel + "px",
    };
  } catch (err) {
    return {
      top: 0,
      height: 0,
    };
  }
};
