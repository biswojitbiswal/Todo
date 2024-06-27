import mongoose from "mongoose";
import { Contact } from "../models/contact.model.js";
import { AsyncHandller } from "../utils/AsyncHandller.js";

const contactData = AsyncHandller( async(req, res) => {
    try {
        const {email, message} = req.body;
    
        if(!email || !message){
            return res.status(400).json({message: "All fields required"})
        }
    
        const data = await Contact.create({email, message})
    
        if(!data){
            return res.status(500).json({message: "Something went wrong"})
        }

        const senderId = new mongoose.Types.ObjectId(req.userId)

        await Contact.updateOne(
            {
                _id : data._id
            },
            {
                $set: {
                    sender : senderId
                }
            },
            {upsert: false, new: true}
        )
    
        return res.status(200).json({message: "Message delivered", data})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Message not delivered", error})
    }
})


export {
    contactData
}