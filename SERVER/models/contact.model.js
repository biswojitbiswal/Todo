import mongoose, {Schema} from "mongoose";

export const contactSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
}, {timestamps: true})

export const Contact = mongoose.model("Contact", contactSchema)