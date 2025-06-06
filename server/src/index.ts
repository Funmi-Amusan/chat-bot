import express from 'express'
import cors from "cors";
import http from 'http';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import { Server } from "socket.io";
import swaggerUi from 'swagger-ui-express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import userRouter from './routes/users';
import conversationRouter from './routes/conversation';
// import { createRequire } from 'module';
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require('./swagger-config');
// const customRequire = createRequire(import.meta.url);
// import swaggerFile from './swagger-output.json';


dotenv.config();

const app = express()
app.use(express.json({ limit: '20mb' }))

app.use(cors());
app.use(helmet())
app.use(morgan('dev'))

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
  customSiteTitle: "Chat API Documentation",
  swaggerOptions: {
    explorer: true,
    filter: true,
    showRequestDuration: true,
  }
}));

app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
// Configure Google Generative AI
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("GEMINI_API_KEY is not set in the .env file.");
  process.exit(1); 
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro-preview-05-06" });

console.log(`Using Gemini model: ${model.model}`);
  
app.use("/api/v1", userRouter);
app.use("/api/v1/conversation", conversationRouter);

const PORT = process.env.PORT || 8000;

io.on('connection', (socket) => {
    
  socket.on('join_conversation', (conversationId) => {
    socket.join(conversationId);
  });

  socket.on('leave_conversation', (conversationId) => {
    socket.leave(conversationId);
  });

  socket.on('disconnect', () => {});
});

export { io, model };

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})