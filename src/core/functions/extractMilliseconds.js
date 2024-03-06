import moment from "moment";

/**
 * NOTE:
 * PLEASE READ THIS BEFORE CONTINUING
 * 
 * Time given should not be like 1 month, 1 year, It should be like 1 months, 1 years, 4 years, 1 days, 10 days.
 * You need to have s after that like 1 months
*/

function extractMilliseconds(input) {
  const parsedInput = input.split(" ");
  if (parsedInput.length === 2) {
    const quantity = parseInt(parsedInput[0], 10);
    const unit = parsedInput[1];

    const unitMap = {
      milliseconds: "milliseconds",
      seconds: "seconds",
      minutes: "minutes",
      hours: "hours",
      days: "days",
      weeks: "weeks",
      months: "months",
      years: "years",
    };

    if (unitMap[unit]) {
      const milliseconds = moment
        .duration(quantity, unitMap[unit])
        .asMilliseconds();
      return milliseconds;
    }
  }

  return null;
}

export default extractMilliseconds;
