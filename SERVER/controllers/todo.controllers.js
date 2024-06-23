import { AsyncHandller } from "../utils/AsyncHandller.js";
import { Todo } from "../models/todo.model.js";
import mongoose from "mongoose";

const createTodo = AsyncHandller( async(req, res) => {
    try {
        const { note, date } = req.body;
        // console.log(note)
        // console.log(date)
        
       const addnote = await Todo.create({note, date}) 

       if(!addnote){
        res.status(400).json({message: "something is wrong"})
       }

       let objId = new mongoose.Types.ObjectId(req.userId)
    //    console.log(objId)
       await Todo.updateOne(
        {
            _id : addnote._id
        },
        {
            $set: {
                createdBy: objId
            }
        },
        {upsert: false, new: true}
       )
    
       return res.status(200).json({message: "Todo added successfully"});
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Todo not add"})
    }
})


const getCurrTodo = AsyncHandller( async(req, res) => {
    try {
        const { day, month, year } = req.params;
        const currDate = `${day}/${month}/${year}`;
        const userId = req.params.id;

        const result = await Todo.find({ date: currDate, createdBy: userId}).sort({ _id: -1 })

        if(result.length > 0){
            result.sort((a, b) => {
                if (a.completed && !b.completed) return 1;
                if (!a.completed && b.completed) return -1;
                return 0;
            });

            return res.status(200).json({
                message: "Todos are fetched",
                todos: result,
            })
        } else {
            res.status(404).json({message: "No Note found"})
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Something went wrong"})
    }
})

const editTodoById = AsyncHandller( async(req, res) => {
   try {
    const { note, date } = req.body;
    const id = req.params.id; 


    const updatedTodo = await Todo.findByIdAndUpdate(
        id,
        { 
            $set: 
            { 
                note, 
                date 
            } 
        },
        { new: true } 
    );

    if (!updatedTodo) {
        return res.status(400).json({ message: "Todo not found" });
    }

    return res.status(200).json({ message: "Todo updated", updatedTodo });
   } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Somethimg went wrong", error})
   }
})

const handleTodoCompleted = AsyncHandller( async(req, res) => {
    try {
        const id = req.params.id
        
        const note = await Todo.findById({_id : id})

        if(!note){
            res.status(400).json({message: "Note not found"})
        }

        note.completed = !note.completed
        await note.save();

        return res.status(200).json({message: "Completed", note})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Somethimg went wrong", error})
    }
})

const deleteTodoById = AsyncHandller( async(req, res) => {
    try {
        const id = req.params.id;

        await Todo.deleteOne({ _id : id });

        return res.status(200).json({message: "Note deleted"})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error"})
    }
})

export {
    createTodo,
    getCurrTodo,
    deleteTodoById,
    handleTodoCompleted,
    editTodoById
}