import express from "express"
import authRouter from "./route/auth.routes.js"
import coookieParser from "cookie-parser"
const app=express()
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))



app.use("/api/auth",authRouter)

export {app}