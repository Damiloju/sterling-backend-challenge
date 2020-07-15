require('dotenv').config();
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');
const { v4: uuidv4 } = require('uuid');

const fixtureSchema = new mongoose.Schema(
  {
    homeTeam: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Team',
    },
    awayTeam: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Team',
    },
    date: {
      type: Date,
      required: true,
    },
    teamStadium: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Team',
    },
    homeTeamScore: {
      type: Number,
      default: 0,
    },
    awayTeamScore: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'completed'],
    },
  },
  {
    timestamps: true,
  },
);

fixtureSchema.virtual('link').get(() => {
  const { APP_URL } = process.env;
  return `${APP_URL}/watch-game/${uuidv4()}`;
});

fixtureSchema.methods.toJSON = function () {
  const fixture = this;

  const fixtureObject = fixture.toObject();

  return fixtureObject;
};

fixtureSchema.plugin(uniqueValidator);
fixtureSchema.plugin(mongoosePaginate);

const Fixture = mongoose.model('Fixture', fixtureSchema);

module.exports = Fixture;
