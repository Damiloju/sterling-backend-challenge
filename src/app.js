require('dotenv').config();

const createError = require('http-errors');
const bodyParser = require('body-parser');
const express = require('express');
require('./db/mongoose');
const morgan = require('morgan');
const winston = require('winston');
const expressWinston = require('express-winston');
const session = require('express-session');
const redis = require('redis');

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || '127.0.0.1',
});
const RedisStore = require('connect-redis')(session);
const winstonOptions = require('./config/winston');

const logger = require('./logger');

// Require the http response code
const HTTPStatus = require('./lib/utils/httpStatus');

// Require Routes
const appRoutes = require('./routes/index');

const app = express();

app.set('trust proxy', 1);

redisClient.on('error', (err) => {
  logger.error('Redis error: ', err);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    name: process.env.APP_NAME,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
    store: new RedisStore({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      client: redisClient,
      ttl: 86400,
    }),
  }),
);

// Define the accepted request type
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set log for all requests
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined', { stream: logger.stream }));
}

app.use(express.json());

// Add CORS headers
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization, Content-Type, x-api-access-token',
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Set content type
  res.setHeader('content-type', 'application/json');

  // Pass to next layer of middleware
  next();
});

if (process.env.NODE_ENV !== 'test') {
  app.use(
    expressWinston.logger({
      transports: [new winston.transports.File(winstonOptions.file)],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
      ),

      // eslint-disable-next-line max-len
      meta: true, // optional: control whether you want to log the meta data about the request (default to true)

      msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"

      // eslint-disable-next-line max-len
      expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
      // eslint-disable-next-line max-len
      colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
      ignoreRoute() {
        return false;
      }, // optional: allows to skip some log messages based on request and/or response
    }),
  );
}

app.use('/api/v1', appRoutes);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(HTTPStatus.NOT_FOUND));
});

if (process.env.NODE_ENV !== 'test') {
  app.use(
    expressWinston.errorLogger({
      transports: [new winston.transports.File(winstonOptions.errorLogsFile)],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
      ),
    }),
  );
}

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (process.env.NODE_ENV !== 'test') {
    logger.error(
      `${err.status || HTTPStatus.INTERNAL_SERVER_ERROR} - ${err.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip}`,
    );
  }

  res.status(err.status || HTTPStatus.INTERNAL_SERVER_ERROR);
  res.json({
    error: err.message,
  });
});
module.exports = app;
