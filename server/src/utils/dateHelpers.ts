import moment from 'moment';

interface genDateProps {
    strDate: string;
    defaultDate: string;
    format?: string;
    tz?: string;
}

const offset: { [key: string]: number } = {
    KST: 9,
};

const genDate = ({
    strDate,
    defaultDate,
    format = 'YYYYMMDD',
    tz = 'KST',
}: genDateProps): Date => {
    if (strDate) {
        const date = moment(strDate, format, true).add(offset[tz], 'hours');
        if (date.isValid()) {
            return date.toDate();
        }
    }
    return moment(defaultDate, format, true).add(offset[tz], 'hours').toDate();
};

export { genDate };
