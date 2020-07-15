const Joi = require('@hapi/joi');

const fetchTeamSchema = {};

fetchTeamSchema.schema = Joi.object({
  sort: Joi.string(),
  page: Joi.number(),
  limit: Joi.number(),
  pagination: Joi.bool(),
});

// Validate the team schema
fetchTeamSchema.validate = async (body) => {
  try {
    const result = await fetchTeamSchema.schema.validateAsync(body);
    return result;
  } catch (error) {
    throw new Error(error.details[0].message);
  }
};

module.exports = fetchTeamSchema;
