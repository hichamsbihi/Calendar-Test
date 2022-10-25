export const get_hours_of_day = () => {
  const hours_of_day = {};

  for (var cpt = 0; cpt < 24; cpt++)
    hours_of_day[cpt] = cpt < 10 ? "0" + cpt + ":00" : cpt + "00";

  return hours_of_day;
};
