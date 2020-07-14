const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      lowerCase: true,
      unique: true,
      minlength: 5,
    },
    stadium: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowerCase: true,
      minlength: 5,
    },
  },
  {
    timestamps: true,
  },
);

teamSchema.methods.toJSON = function () {
  const team = this;

  const teamObject = team.toObject();

  return teamObject;
};

teamSchema.plugin(uniqueValidator);

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
