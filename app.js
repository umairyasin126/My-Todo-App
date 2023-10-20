import express from "express"
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
    path: "./data/config.env",
});

//Using middleware
app.use(express.json()); //Use first
app.use(cookieParser());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://todo-app-frontend-iota.vercel.app'); 
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  

// const corsOptions ={
//     origin: "https://todo-app-frontend-iota.vercel.app",
//     methods: ["GET","POST", "PUT", "DELETE"],
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200,
// }
// app.use(cors(corsOptions));
//custom url /users is added and it will be present in every url
//using routes
app.use("/api/v1/users", userRouter) 
app.use("/api/v1/task", taskRouter)

app.get("/", (req, res) => {
    res.send("Nice working");
  });
  
//Error middleware
app.use(errorMiddleware);