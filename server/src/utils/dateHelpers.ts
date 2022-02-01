import moment from "moment";

interface genMomentDateProps {
  strDate: string;
  defaultDate: string;
  format?: string;
}

const genMomentDate = ({
  strDate,
  defaultDate,
  format="YYYYMMDD",
}:genMomentDateProps
): moment.Moment => {
  let result;
  try {
    result = moment(strDate, format, true);
  } catch {
    result = moment(defaultDate, format, true);
  }
  return result;
};

export { genMomentDate };
