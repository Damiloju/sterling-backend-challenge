require('dotenv').config();

const mongoose = require('mongoose');

const { MONGO_USERNAME } = process.env;
const { MONGO_PASSWORD } = process.env;
const { MONGO_HOSTNAME } = process.env;
const { MONGO_PORT } = process.env;
const { MONGO_DB } = process.env;

let connectionURL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

if (process.env.NODE_ENV === 'test') {
  connectionURL = process.env.MONGO_DB_TEST_URL;
}

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
