const Joi = require('@hapi/joi');

const editFixtureSchema = {};

editFixtureSchema.schema = Joi.object({
  homeTeam: Joi.string().pattern(new RegExp(/^[a-f\d]{24}$/i)),
  awayTeam: Joi.string().pattern(new RegExp(/^[a-f\d]{24}$/i)),
  teamStadium: Joi.string().pattern(new RegExp(/^[a-f\d]{24}$/i)),
  date: Joi.date(),
  status: Joi.string().valid('pending', 'completed'),
  awayTeamScore: Joi.number(),
  homeTeamScore: Joi.number(),
});

// Validate the team schema
editFixtureSchema.validate = async (body) => {
  try {
    const result = await editFixtureSchema.schema.validateAsync(body);
    return result;
  } catch (error) {
    throw new Error(error.details[0].message);
  }
};

module.exports = editFixtureSchema;
