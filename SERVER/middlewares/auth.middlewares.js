import { Todo } from "../models/todo.model.js";
import { User } from "../models/user.models.js";
import { AsyncHandller } from "../utils/AsyncHandller.js";
import jwt from 'jsonwebtoken'



const authVerify = AsyncHandller( async(req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "")

        if(!token){
            res.status(401).json({message: "Unauthorized requests"})
        }
        // console.log(token)
        
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodeToken._id).select(
            "-password"
        )

        if(!user){
            res.status(401).json({message: "Inavlid access token"})
        }

        const {day, month, year} = req.params;
        const notes = await Todo.find({userId: user._id, date: `${day}/${month}/${year}`});

        req.user = user;
        req.token = token;
        req.notes = notes;
        req.userId = user._id;

        next();
    } catch (error) {
        return res.status(401).json({message: "Inavlid access token"})
    }
})

export default authVerify