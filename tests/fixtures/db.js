const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Team = require('../../src/models/team');

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

const setUpDatabase = async () => {
  await User.deleteMany();
  await Team.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
};

module.exports = {
  userOneID,
  userOne,
  setUpDatabase,
  userTwo,
  userTwoID,
};
