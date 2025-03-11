import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Chat App API',
    description: 'Chat App API Documentation',
    version: '1.0.0',
  },
  host: 'localhost:5000',
  basePath: '/api/v1',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Conversations',
      description: 'Conversation endpoints'
    }
  ],
  definitions: {
    Conversation: {
      id: "string",
      title: "string",
      userId: "string",
      createdAt: "2023-01-01T00:00:00Z",
      updatedAt: "2023-01-01T00:00:00Z"
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./Routes/conversationRoute.js']; 

swaggerAutogen(outputFile, endpointsFiles, doc);