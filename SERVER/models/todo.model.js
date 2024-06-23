import mongoose, {Schema} from "mongoose";


export const todoSchema = new mongoose.Schema({
    note:{
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    completed: {
        type: Boolean,
        default: false
    },
    date: {
        type: String,
        required: true
    }
}, {timestamps: true})

export const Todo = mongoose.model("Todo", todoSchema)