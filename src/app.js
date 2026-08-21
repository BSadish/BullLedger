import express from "express"
import coookieParser from "cookie-parser"

const app=express()

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(coookieParser())


/**
 * - Route required
 */
import accountRouter from "./route/account.routes.js"
import authRouter from "./route/auth.routes.js"


/**
 * - Use Routes
 */
app.use("/api/auth",authRouter)
app.use ("/api/accounts",accountRouter)

export {app}