import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'


export const verifyJWT = async (req, res, next) => {
    try {
        const authHeader = req?.headers?.authorization;
        if (!authHeader || !authHeader?.startsWith("Bearer")) {
            throw new Error("authentication failed");
        }

        const token = authHeader?.split(" ")[1];
        if (!token) {
            throw new Error("Invalid request1");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new Error("Invalid request");
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};
