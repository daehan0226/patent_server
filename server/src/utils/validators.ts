import moment from "moment";

const validateStrDate = (
  strDate: string,
  format: string
): moment.Moment | false => {
  const result = moment(strDate, format, true);
  return result.isValid() ? result : false;
};

export { validateStrDate };
