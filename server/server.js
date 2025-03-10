import express from 'express'
import cors from "cors";
import http from 'http';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import { Server } from "socket.io";

// import userRouter from './Routes/userRoute.js'
import conversationRouter from './Routes/conversationRoute.js'

dotenv.config();

const app = express()
app.use(express.json())
app.use(cors());
app.use(helmet())
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

app.use("/api/v1", userRouter);
app.use("/api/v1/conversation", conversationRouter);

const PORT = process.env.PORT || 5000;



  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})