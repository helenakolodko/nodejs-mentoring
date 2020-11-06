const Joi = require('@hapi/joi');

export const authSchema = Joi.object().keys({
    login: Joi.string()
        .required(),
    password: Joi.string()
        .required()
        .regex(/(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)/)
        .messages({
            'string.pattern.base': '"password" must contain letters and numbers'
        })
});