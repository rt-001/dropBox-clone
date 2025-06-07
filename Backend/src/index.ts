import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import fileRoutes from "./routes/fileRoutes";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/files", fileRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
const PORT = 8000;
const mongoUri: any = process.env.MONGO_URI;
if (!mongoUri) {
    console.error("❌  MONGO_URI is not defined in .env");
    process.exit(1);
}
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend is up at port ${PORT}.`);
    mongoose.set("strictQuery", true);
    mongoose
        .connect(mongoUri)
        .then(() => console.log("Established a connection with the database"))
        .catch((err) => console.log("Error connecting to database", err));
});