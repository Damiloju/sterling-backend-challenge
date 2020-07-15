const Joi = require('@hapi/joi');

const editTeamSchema = {};

editTeamSchema.schema = Joi.object({
  name: Joi.string().min(5),
  stadium: Joi.string().min(5),
});

// Validate the team schema
editTeamSchema.validate = async (body) => {
  try {
    const result = await editTeamSchema.schema.validateAsync(body);
    return result;
  } catch (error) {
    throw new Error(error.details[0].message);
  }
};

module.exports = editTeamSchema;
