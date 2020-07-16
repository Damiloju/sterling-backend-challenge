require('dotenv').config();

const mongoose = require('mongoose');
const logger = require('../logger');

const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DB,
  MONGO_DB_TEST,
} = process.env;

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
};

let connectionURL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin?retryWrites=true&w=majority`;

if (process.env.NODE_ENV === 'production') {
  connectionURL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?retryWrites=true&w=majority`;
}

if (process.env.NODE_ENV === 'test') {
  connectionURL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB_TEST}?authSource=admin?retryWrites=true&w=majority`;
}

mongoose
  .connect(connectionURL, options)
  .then(() => {
    logger.info('MongoDB is connected');
  })
  .catch((err) => {
    logger.error(err);
  });
