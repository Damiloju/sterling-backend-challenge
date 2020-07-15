const Joi = require('@hapi/joi');

const createFixtureSchema = {};

createFixtureSchema.schema = Joi.object({
  homeTeam: Joi.string()
    .pattern(new RegExp(/^[a-f\d]{24}$/i))
    .required(),
  awayTeam: Joi.string()
    .pattern(new RegExp(/^[a-f\d]{24}$/i))
    .required(),
  teamStadium: Joi.string()
    .pattern(new RegExp(/^[a-f\d]{24}$/i))
    .required(),
  date: Joi.date().required(),
  status: Joi.string().valid('pending', 'completed'),
  awayTeamScore: Joi.number(),
  homeTeamScore: Joi.number(),
});

// Validate the team schema
createFixtureSchema.validate = async (body) => {
  try {
    const result = await createFixtureSchema.schema.validateAsync(body);
    return result;
  } catch (error) {
    throw new Error(error.details[0].message);
  }
};

module.exports = createFixtureSchema;
