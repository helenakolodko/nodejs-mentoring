const Joi = require('@hapi/joi');

const userSchema = Joi
    .object({
        id: Joi.string()
            .required(),
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

export default userSchema;
