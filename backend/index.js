import express from "express";
import http from "http";
import { initSocket } from "./socket.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

const app = express();

const server = http.createServer(app);

initSocket(server);

const allowedOrigins = "https://chat-flow-i05zq4qvr-tonys-projects-820cffb4.vercel.app";

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL)
    .then(() => {
        console.log("MongoDB connected successfully");
        server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })