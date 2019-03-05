import Joi from 'joi';
const validateUser = user => {
  const schema = {
    firstName: Joi.string()
      .min(3)
      .required(),
    lastName: Joi.string()
      .min(5)
      .required(),
    email: Joi.string()
      .min(10)
      .required(),
    password: Joi.string()
      .min(8)
      .required()
  };
  return Joi.validate(user, schema);
};
const validateAuth = auth => {
  const schema = {
    email: Joi.string()
      .min(10)
      .required(),
    password: Joi.string()
      .min(8)
      .required()
  };
  return Joi.validate(auth, schema);
};
export { validateUser, validateAuth };
