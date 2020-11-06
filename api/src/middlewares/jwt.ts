import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.ACCESS_TOKEN_SECRET as jwt.Secret;

export const signAccessToken = (userId: string) => {
    const payload = { 'sub': userId };
    return jwt.sign(payload, secret);
};

export const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(403).end(`Invalid token`);
            }
            next();
        });
    } else {
        res.status(401).end(`Unauthorized`);
    }
};