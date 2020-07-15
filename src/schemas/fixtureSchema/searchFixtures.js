const Joi = require('@hapi/joi');

const fetchFixtureSchema = {};

fetchFixtureSchema.schema = Joi.object({
  sort: Joi.string(),
  page: Joi.number(),
  limit: Joi.number(),
  pagination: Joi.bool(),
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
