const Joi = require('@hapi/joi');

export const groupCreateSchema = Joi
    .object({
        id: Joi.string()
            .guid({ version: 'uuidv4' }),
        name: Joi.string()
            .required(),
        permissions: Joi.array()
            .items(Joi.string()
                .valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'))
    });

export const groupUpdateSchema = Joi
    .object({
        name: Joi.string()
            .required(),
        permissions: Joi.array()
            .items(Joi.string()
                .valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'))
    });
