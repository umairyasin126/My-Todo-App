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


const corsOptions ={
    origin:"http://localhost:5173/",
    methods: ["GET","POST", "PUT", "DELETE"],
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors());
//custom url /users is added and it will be present in every url
//using routes
app.use("/api/v1/users", userRouter) 
app.use("/api/v1/task", taskRouter)

app.get("/", (req, res) => {
    res.send("Nice working");
  });
  
//Error middleware
app.use(errorMiddleware);