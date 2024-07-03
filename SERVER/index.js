import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDb from './DB/db.js';
import userRouter from './routes/user.routes.js'
import contactRouter from './routes/contact.routes.js'
import todoRouter from './routes/todo.routes.js'
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/error.middlewares.js';

const app = express();

const PORT = process.env.PORT || 4000;


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true
}))


app.use(express.urlencoded({extended: true, limit: "20kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(express.json())



app.use("/api/todo/users", userRouter);
app.use("/api/todo/contact", contactRouter)
app.use("/api/todo/notes", todoRouter)


app.use(errorMiddleware)

app.get("/", (req, res) => {
    res.send("Express on Vercel");

});

connectDb()
.then(() => {
    app.on("error", (error) => {
        console.log("Error", error);
        throw error
    })
    app.listen(PORT, () => {
        console.log(`app is listening on ${PORT}`)
    })
})
.catch((error) => {
    console.log("connection failed", error);
})
