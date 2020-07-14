const Joi = require('@hapi/joi');

const createUserSchema = {};

createUserSchema.schema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  is_admin: Joi.bool(),
});

// Validate the user registration schema
createUserSchema.validate = async (body) => {
  try {
    const result = await createUserSchema.schema.validateAsync(body);
    return result;
  } catch (error) {
    throw new Error(error.details[0].message);
  }
};

module.exports = createUserSchema;
