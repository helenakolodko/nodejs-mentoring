const Joi = require('@hapi/joi');
import { Permission } from '../entities/group/group.interface';

const userSchema = Joi
    .object({
        id: Joi.string()
            .guid({ version : 'uuidv4' })
            .required(),
        name: Joi.string()
            .required(),
        permissions: Joi.array()
            .items(Joi.string()
                .valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'))
    });

export default userSchema;
