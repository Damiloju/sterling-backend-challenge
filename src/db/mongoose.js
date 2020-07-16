require('dotenv').config();

const mongoose = require('mongoose');
const logger = require('../logger');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
} = process.env;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
};

let connectionURL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

if (process.env.NODE_ENV === 'test') {
  connectionURL = process.env.MONGO_DB_TEST_URL;
}

mongoose
  .connect(connectionURL, options)
  .then(() => {
    logger.info('MongoDB is connected');
  })
  .catch((err) => {
    logger.error(err);
  });
