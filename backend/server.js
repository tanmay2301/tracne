import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import tracneRoutes from './routes/tracne.route.js';
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002; // Use environment variable for flexibility

app.use(express.json());

// Routes
app.use('/api/tracne', tracneRoutes); // Updated route for acne tracking logs
app.use("/api/users", userRoutes);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at port ${PORT}`);
});
