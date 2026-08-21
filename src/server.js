import "dotenv/config";
import { app } from "./app.js"

import connectDB from "./db/index.db.js"



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