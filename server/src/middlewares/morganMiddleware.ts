import morgan, { StreamOptions } from 'morgan';

import Logger from './logger';

const stream: StreamOptions = {
    write: (message) =>
        Logger.http(message.substring(0, message.lastIndexOf('\n'))),
};

const morganMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    { stream }
);

export default morganMiddleware;
