import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import testRoute from "./routes/testRoute.js"

const app = express()

app.use(express.json())
app.use(cors())

dotenv.config()

connectDB()

app.use("/api/auth", authRoutes)
app.use("/api/notes", notesRoutes)
app.use("/api/test", testRoute)




app.listen(process.env.PORT, ()=>{
    console.log(`App listening on port: ${process.env.PORT}`)
})
