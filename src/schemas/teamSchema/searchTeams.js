const Joi = require('@hapi/joi');

const searchTeamSchema = {};

searchTeamSchema.schema = Joi.object({
  name: Joi.string(),
  stadium: Joi.string(),
});

// Validate the team schema
searchTeamSchema.validate = async (body) => {
  try {
    const result = await searchTeamSchema.schema.validateAsync(body);
    return result;
  } catch (error) {
    throw new Error(error.details[0].message);
  }
};

module.exports = searchTeamSchema;
