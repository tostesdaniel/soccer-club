import * as Joi from 'joi';
import userMessages from './user.messages';

export default {
  login: Joi.object({
    email: Joi.string().required().empty('').messages({
      'any.required': userMessages.emptyFields,
      'string.empty': userMessages.emptyFields,
    }),
    password: Joi.string().required().empty('').messages({
      'any.required': userMessages.emptyFields,
      'string.empty': userMessages.emptyFields,
    }),
  }),
};
