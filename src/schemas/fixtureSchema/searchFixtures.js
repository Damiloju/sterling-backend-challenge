const Joi = require('@hapi/joi');

const fetchFixtureSchema = {};

fetchFixtureSchema.schema = Joi.object({
  homeTeam: Joi.string(),
  awayTeam: Joi.string(),
  teamStadium: Joi.string(),
  date: Joi.date(),
  status: Joi.string(),
});

// Validate the fixture schema
fetchFixtureSchema.validate = async (body) => {
  try {
    const result = await fetchFixtureSchema.schema.validateAsync(body);
    return result;
  } catch (error) {
    throw new Error(error.details[0].message);
  }
};

module.exports = fetchFixtureSchema;
