import winston from 'winston'
import  DailyRotateFile from 'winston-daily-rotate-file';
import moment from 'moment-timezone';


const timezoned = () => {
    return moment.tz(new Date(), "Asia/Seoul").format('YYYY-MM-DD h:mm:ss')
};

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}

winston.addColors(colors)

const format = winston.format.combine(
    winston.format.timestamp({ format: timezoned  }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
)

const transports = [];
if (process.env.NODE_ENV !== 'development') {
    const dailyRotateFileInfoTransport:DailyRotateFile  = new DailyRotateFile({
        filename: 'logs/%DATE%.info.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        level: "http",
       });
    const dailyRotateFileErrorTransport:DailyRotateFile  = new DailyRotateFile({
        filename: 'logs/%DATE%.error.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        level: "warn",
    });
    transports.push(dailyRotateFileInfoTransport)
    transports.push(dailyRotateFileErrorTransport)
} else {
    transports.push(new winston.transports.Console({
      level: 'debug'
    }))
}

const Logger = winston.createLogger({
    levels,
    format,
    transports
})

export default Logger