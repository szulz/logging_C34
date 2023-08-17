const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.colorize({all: true})
        }),

        new winston.transports.File({
            filename: './errors.log',
            level: 'error',
            format: winston.format.simple(),
        }),
        new winston.transports.File({
            filename: './errors.log',
            level: 'warn',
            format: winston.format.simple(),
        }),
    ],
});



const addLogger = (req, res, next) => {
    req.logger = logger
    next()
}

module.exports = {
    addLogger: addLogger,
    logger: logger
};
