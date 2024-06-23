import { Router } from "express";
import { createTodo, deleteTodoById, editTodoById, getCurrTodo, handleTodoCompleted } from "../controllers/todo.controllers.js";
import validate from "../middlewares/validate.middlewares.js";
import todoSchema from "../validator/todo.validators.js";
import authVerify from "../middlewares/auth.middlewares.js";


const router = Router()

router.route("/addnote").post(validate(todoSchema), authVerify, createTodo)
router.route("/gettodo/:day/:month/:year/:id").get(authVerify, getCurrTodo);
router.route("/delete/:id").post(authVerify, deleteTodoById)
router.route("/update/:id").patch(authVerify, editTodoById)
router.route("/complete/:id").post(authVerify, handleTodoCompleted)

export default router