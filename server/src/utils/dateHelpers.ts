import moment from "moment";

interface genDateProps {
  strDate: string;
  defaultDate: string;
  format?: string;
}

const genDate = ({
  strDate,
  defaultDate,
  format="YYYYMMDD",
}:genDateProps
): Date => {
  if (strDate) {
    const date = moment(strDate, format, true)
    if (date.isValid()) {
      return date.toDate();
    } 
  }
  return moment(defaultDate, format, true).toDate();
};

export { genDate };
