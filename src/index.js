import { app } from "./app.js";
import dotenv from "dotenv"
import connectDB from "./db/index.db.js";

dotenv.config({
    path:"./.env"
})

connectDB() //return a promise as it is an async function as succes proceed to .then else goes to catch
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("App running on PORT",process.env.PORT)
    })
})
.catch((error)=>{
    console.error("Mongodb connection failed",error.message)
    process.exit(1)
}
)