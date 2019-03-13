import Joi from 'joi';

const validateUser = user => {
  const schema = {
    firstName: Joi.string()
      .min(3)
      .required(),
    lastName: Joi.string()
      .regex(/^[a-zA-Z ]/)
      .required(),
    email: Joi.string()
      .regex(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      .required(),
    password: Joi.string()
      .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8})$/)
      .required()
  };
  return Joi.validate(user, schema);
};

const validateMessage = message => {
  const schema = {
    subject: Joi.string()
      .regex(/^[a-zA-Z ]/)
      .required(),
    message: Joi.string()
      .min(5)
      .required(),
    parentMessageId: Joi.number()
      .min(1)
      .required(),
    status: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(message, schema);
};
export { validateUser, validateMessage };
