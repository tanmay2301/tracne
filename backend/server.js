import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import tracneRoutes from './routes/tracne.route.js';
import userRoutes from "./routes/user.route.js";
import path from "path"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002; 
const HOST = "0.0.0.0"; 

const __dirname = path.resolve() 

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));


// Routes
app.use('/api/tracne', tracneRoutes); 
app.use("/api/users", userRoutes);


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")))
    
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}


app.listen(PORT, HOST, () => {
    connectDB();
    console.log(`Server started at port ${PORT}`);
});
