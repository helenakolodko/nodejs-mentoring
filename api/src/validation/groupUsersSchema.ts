const Joi = require('@hapi/joi');

const groupUsersSchema = Joi
    .object({
        userIds: Joi.array()
            .items(Joi.string()
                .guid({ version: 'uuidv4' }))
            .required()
    });

export default groupUsersSchema;
