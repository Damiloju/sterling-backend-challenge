const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');

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
    fixtures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fixture',
      },
    ],
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
teamSchema.plugin(mongoosePaginate);

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
