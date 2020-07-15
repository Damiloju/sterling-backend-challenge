require('dotenv').config();
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');
const idvalidator = require('mongoose-id-validator');

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
      default: null,
    },
    awayTeamScore: {
      type: Number,
      default: null,
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'completed'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

fixtureSchema.virtual('link').get(function () {
  const { APP_URL } = process.env;
  // eslint-disable-next-line no-underscore-dangle
  return `${APP_URL}/watch-game/${this._id}`;
});

fixtureSchema.plugin(uniqueValidator);
fixtureSchema.plugin(mongoosePaginate);
fixtureSchema.plugin(idvalidator);

const Fixture = mongoose.model('Fixture', fixtureSchema);

module.exports = Fixture;
