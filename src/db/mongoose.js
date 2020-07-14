require('dotenv').config();

const mongoose = require('mongoose');

const { MONGO_USERNAME } = process.env;
const { MONGO_PASSWORD } = process.env;
const { MONGO_HOSTNAME } = process.env;
const { MONGO_PORT } = process.env;
const { MONGO_DB } = process.env;

const connectionURL = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
