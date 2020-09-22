const Joi = require('@hapi/joi');

export const userCreateSchema = Joi
    .object({
        id: Joi.string()
            .guid({ version: 'uuidv4' }),
        login: Joi.string()
            .required(),
        password: Joi.string()
            .required()
            .regex(/(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)/)
            .messages({
                'string.pattern.base': '"password" must contain letters and numbers'
            }),
        age: Joi.number()
            .required()
            .min(4)
            .max(130),
        isDeleted: Joi.boolean()
            .required()
    });

export const userUpdateSchema = Joi
    .object({
        login: Joi.string()
            .required(),
        password: Joi.string()
            .required()
            .regex(/(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)/)
            .messages({
                'string.pattern.base': '"password" must contain letters and numbers'
            }),
        age: Joi.number()
            .required()
            .min(4)
            .max(130),
        isDeleted: Joi.boolean()
            .required()
    });
