const Joi = require('@hapi/joi');

const createTeamSchema = {};

createTeamSchema.schema = Joi.object({
  name: Joi.string().min(5).required(),
  stadium: Joi.string().min(5).required(),
});

// Validate the team schema
createTeamSchema.validate = async (body) => {
  try {
    const result = await createTeamSchema.schema.validateAsync(body);
    return result;
  } catch (error) {
    throw new Error(error.details[0].message);
  }
};

module.exports = createTeamSchema;
