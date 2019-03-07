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
const validateMessage = message => {
  const schema = {
    subject: Joi.string()
      .min(3)
      .required(),
    newMessage: Joi.string()
      .min(5)
      .required(),
    parentId: Joi.number()
      .min(1)
      .required(),
    status: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(message, schema);
};
export { validateUser, validateAuth, validateMessage };
