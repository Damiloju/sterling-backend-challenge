const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Team = require('../../src/models/team');
const Fixture = require('../../src/models/fixture');

const userOneID = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneID,
  username: 'Mike',
  email: 'mike@example.com',
  is_admin: true,
  password: 'Wosmdk12333',
  tokens: [
    {
      token: jwt.sign(
        {
          _id: userOneID,
        },
        process.env.JWT_SECRET,
      ),
    },
  ],
};

const userTwoID = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoID,
  username: 'Maley',
  email: 'fuss@example.com',
  password: 'Wosmdkdss12333',
  tokens: [
    {
      token: jwt.sign(
        {
          _id: userTwoID,
        },
        process.env.JWT_SECRET,
      ),
    },
  ],
};

const teamOneID = new mongoose.Types.ObjectId();
const teamOne = {
  _id: teamOneID,
  name: 'Newcastle United',
  stadium: 'Vintage Road',
};

const fixtureOneID = new mongoose.Types.ObjectId();
const fixtureOne = {
  _id: fixtureOneID,
  homeTeam: teamOneID,
  awayTeam: teamOneID,
  teamStadium: teamOneID,
  date: new Date(),
};

const setUpDatabase = async () => {
  await User.deleteMany();
  await Team.deleteMany();
  await Fixture.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Team(teamOne).save();
  await new Fixture(fixtureOne).save();
};

module.exports = {
  userOneID,
  userOne,
  setUpDatabase,
  userTwo,
  userTwoID,
  teamOne,
  teamOneID,
  fixtureOneID,
};
