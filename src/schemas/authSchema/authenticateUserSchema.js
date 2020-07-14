const Joi = require('@hapi/joi');

const authenticateUserSchema = {};

authenticateUserSchema.schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Validate the user login schema
authenticateUserSchema.validate = async (body) => {
  try {
    const result = await authenticateUserSchema.schema.validateAsync(body);
    return result;
  } catch (error) {
    throw new Error(error.details[0].message);
  }
};

module.exports = authenticateUserSchema;
