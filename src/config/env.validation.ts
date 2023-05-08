import * as Joi from 'joi';

export const EnvValidationSchema = Joi.object({
  MONGO_URL: Joi.required(),
  PORT: Joi.number().default(3001),
});
