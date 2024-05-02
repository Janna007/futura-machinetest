//get all users

import { User } from "../models/user.model.js";

const getUsers=async(req,res,next)=>{
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

}

export {getUsers}