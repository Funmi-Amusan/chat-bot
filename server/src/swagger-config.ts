const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Chat API',
      version: '1.0.0',
      description: 'A comprehensive chat API with AI integration using Google Generative AI',
      contact: {
        name: 'API Support',
        email: 'maryamusan77@gmail.com.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Development server',
      },
      {
        url: 'https://chat-bot-mfkm.onrender.com',
        description: 'Production server',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique user identifier',
              example: 'user_123456789',
            },
            name: {
              type: 'string',
              description: 'User full name',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john.doe@example.com',
            },
          },
        },
        Conversation: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique conversation identifier',
              example: 'conv_123456789',
            },
            title: {
              type: 'string',
              description: 'Conversation title',
              example: 'AI Assistant Chat',
            },
            userId: {
              type: 'string',
              description: 'ID of the user who owns this conversation',
              example: 'user_123456789',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Conversation creation timestamp',
              example: '2023-12-01T10:00:00.000Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Conversation last update timestamp',
              example: '2023-12-01T10:30:00.000Z',
            },
            messageCount: {
              type: 'integer',
              description: 'Total number of messages in the conversation',
              example: 5,
            },
          },
        },
        ConversationWithMessages: {
          allOf: [
            { $ref: '#/components/schemas/Conversation' },
            {
              type: 'object',
              properties: {
                messages: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Message' },
                  description: 'Array of messages in the conversation',
                },
              },
            },
          ],
        },
        Message: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique message identifier',
              example: 'msg_123456789',
            },
            parts: {
              type: 'array',
              items: { $ref: '#/components/schemas/MessagePart' },
              description: 'Array of message parts (text, images, files)',
            },
            conversationId: {
              type: 'string',
              description: 'ID of the conversation this message belongs to',
              example: 'conv_123456789',
            },
            isFromAI: {
              type: 'boolean',
              description: 'Whether this message is from AI or user',
              example: false,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Message creation timestamp',
              example: '2023-12-01T10:15:00.000Z',
            },
          },
        },
        MessagePart: {
          oneOf: [
            { $ref: '#/components/schemas/TextPart' },
            { $ref: '#/components/schemas/InlineDataPart' },
            { $ref: '#/components/schemas/FileDataPart' },
          ],
        },
        TextPart: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description: 'Text content of the message',
              example: 'Hello, how can I help you today?',
            },
          },
          required: ['text'],
        },
        InlineDataPart: {
          type: 'object',
          properties: {
            inlineData: {
              type: 'object',
              properties: {
                mimeType: {
                  type: 'string',
                  description: 'MIME type of the inline data',
                  example: 'image/jpeg',
                },
                data: {
                  type: 'string',
                  description: 'Base64 encoded data',
                  example: 'iVBORw0KGgoAAAANSUhEUgAAA...',
                },
              },
              required: ['mimeType', 'data'],
            },
          },
          required: ['inlineData'],
        },
        FileDataPart: {
          type: 'object',
          properties: {
            fileData: {
              type: 'object',
              properties: {
                mimeType: {
                  type: 'string',
                  description: 'MIME type of the file',
                  example: 'application/pdf',
                },
                uri: {
                  type: 'string',
                  description: 'URI to the file',
                  example: 'https://storage.googleapis.com/file123.pdf',
                },
              },
              required: ['mimeType', 'uri'],
            },
          },
          required: ['fileData'],
        },
        CreateUserRequest: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'User full name',
              example: 'John Doe',
              minLength: 2,
              maxLength: 100,
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john.doe@example.com',
            },
            password: {
              type: 'string',
              description: 'User password',
              example: 'SecurePassword123!',
              minLength: 6,
            },
          },
          required: ['name', 'email', 'password'],
        },
        LoginRequest: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john.doe@example.com',
            },
            password: {
              type: 'string',
              description: 'User password',
              example: 'SecurePassword123!',
            },
          },
          required: ['email', 'password'],
        },
        FetchUserRequest: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john.doe@example.com',
            },
          },
          required: ['email'],
        },
        UserResponse: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique user identifier',
              example: 'user_123456789',
            },
            name: {
              type: 'string',
              description: 'User full name',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john.doe@example.com',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'User creation timestamp',
              example: '2023-12-01T10:00:00.000Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'User last update timestamp',
              example: '2023-12-01T10:00:00.000Z',
            },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            userResponse: { $ref: '#/components/schemas/UserResponse' },
            conversations: {
              type: 'array',
              items: { $ref: '#/components/schemas/Conversation' },
              description: 'Array of user conversations',
            },
          },
        },
        CreateConversationRequest: {
          type: 'object',
          properties: {
            userId: {
              type: 'string',
              description: 'ID of the user creating the conversation',
              example: 'user_123456789',
            },
          },
          required: ['userId'],
        },
        SendMessageRequest: {
          type: 'object',
          properties: {
            conversationId: {
              type: 'string',
              description: 'ID of the conversation to send message to',
              example: 'conv_123456789',
            },
            parts: {
              type: 'array',
              items: { $ref: '#/components/schemas/MessagePart' },
              description: 'Array of message parts',
              minItems: 1,
            },
          },
          required: ['conversationId', 'parts'],
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message',
              example: 'Conversation not found',
            },
            status: {
              type: 'integer',
              description: 'HTTP status code',
              example: 404,
            },
            details: {
              type: 'string',
              description: 'Additional error details',
              example: 'The conversation with the specified ID does not exist',
            },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'integer',
              description: 'HTTP status code',
              example: 200,
            },
            message: {
              type: 'string',
              description: 'Success message',
              example: 'Operation completed successfully',
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Users',
        description: 'Operations related to user management and authentication',
      },
      {
        name: 'Conversations',
        description: 'Operations related to chat conversations',
      },
    ],
    paths: {
      '/api/v1/create-user': {
        post: {
          tags: ['Users'],
          summary: 'Create a new user account',
          description: 'Registers a new user with email, name, and password. Also creates an initial conversation for the user.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CreateUserRequest' },
                examples: {
                  'create-user': {
                    summary: 'Create user example',
                    value: {
                      name: 'John Doe',
                      email: 'john.doe@example.com',
                      password: 'SecurePassword123!',
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: 'User created successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'User created successfully. Please log in.',
                      },
                    },
                  },
                  examples: {
                    'user-created': {
                      summary: 'Successfully created user',
                      value: {
                        message: 'User created successfully. Please log in.',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'Bad request - user already exists or invalid data',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  examples: {
                    'user-exists': {
                      summary: 'User already exists',
                      value: {
                        error: 'User with this email already exists. Pls login.',
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  examples: {
                    'server-error': {
                      summary: 'Server error during user creation',
                      value: {
                        error: 'An error occurred while creating the user',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/login': {
        post: {
          tags: ['Users'],
          summary: 'User login',
          description: 'Authenticates a user with email and password, returns user data and conversations',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/LoginRequest' },
                examples: {
                  'login-user': {
                    summary: 'Login example',
                    value: {
                      email: 'john.doe@example.com',
                      password: 'SecurePassword123!',
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Login successful',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/LoginResponse' },
                  examples: {
                    'successful-login': {
                      summary: 'Successful login response',
                      value: {
                        userResponse: {
                          id: 'user_123456789',
                          name: 'John Doe',
                          email: 'john.doe@example.com',
                          createdAt: '2023-12-01T10:00:00.000Z',
                          updatedAt: '2023-12-01T10:00:00.000Z',
                        },
                        conversations: [
                          {
                            id: 'conv_123456789',
                            title: 'Conversation 1',
                            userId: 'user_123456789',
                            createdAt: '2023-12-01T10:00:00.000Z',
                            updatedAt: '2023-12-01T10:00:00.000Z',
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
            401: {
              description: 'Unauthorized - invalid credentials',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  examples: {
                    'invalid-credentials': {
                      summary: 'Invalid password',
                      value: {
                        message: 'Invalid credentials.',
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: 'User not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  examples: {
                    'user-not-found': {
                      summary: 'User not found',
                      value: {
                        message: 'User not found',
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
      },
      '/api/v1/fetch-user': {
        post: {
          tags: ['Users'],
          summary: 'Fetch user by email',
          description: 'Retrieves user information and conversations by email address',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/FetchUserRequest' },
                examples: {
                  'fetch-user': {
                    summary: 'Fetch user example',
                    value: {
                      email: 'john.doe@example.com',
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: 'User fetched successfully',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/LoginResponse' },
                  examples: {
                    'user-fetched': {
                      summary: 'Successfully fetched user',
                      value: {
                        userResponse: {
                          id: 'user_123456789',
                          name: 'John Doe',
                          email: 'john.doe@example.com',
                          createdAt: '2023-12-01T10:00:00.000Z',
                          updatedAt: '2023-12-01T10:00:00.000Z',
                        },
                        conversations: [
                          {
                            id: 'conv_123456789',
                            title: 'Conversation 1',
                            userId: 'user_123456789',
                            createdAt: '2023-12-01T10:00:00.000Z',
                            updatedAt: '2023-12-01T10:00:00.000Z',
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: 'User not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  examples: {
                    'user-not-found': {
                      summary: 'User not found',
                      value: {
                        message: 'User not found',
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
      },
      '/api/v1/conversation/create': {
        post: {
          tags: ['Conversations'],
          summary: 'Create a new conversation',
          description: 'Creates a new conversation for a specific user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CreateConversationRequest' },
                examples: {
                  'create-conversation': {
                    summary: 'Create conversation example',
                    value: {
                      userId: 'user_123456789',
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Conversation created successfully',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Conversation' },
                  examples: {
                    'created-conversation': {
                      summary: 'Successfully created conversation',
                      value: {
                        id: 'conv_123456789',
                        title: 'Untitled Chat',
                        userId: 'user_123456789',
                        createdAt: '2023-12-01T10:00:00.000Z',
                        updatedAt: '2023-12-01T10:00:00.000Z',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'Bad request - missing or invalid userId',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  examples: {
                    'missing-user-id': {
                      summary: 'Missing user ID',
                      value: {
                        error: 'User ID is required',
                        status: 400,
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: 'User not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  examples: {
                    'user-not-found': {
                      summary: 'User not found',
                      value: {
                        error: 'User not found',
                        status: 404,
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
      },
      '/api/v1/conversation/all/{userId}': {
        get: {
          tags: ['Conversations'],
          summary: 'Get all conversations for a user',
          description: 'Retrieves all conversations belonging to a specific user, ordered by most recent',
          parameters: [
            {
              name: 'userId',
              in: 'path',
              required: true,
              description: 'ID of the user whose conversations to retrieve',
              schema: {
                type: 'string',
                example: 'user_123456789',
              },
            },
          ],
          responses: {
            200: {
              description: 'Conversations retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      conversations: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Conversation' },
                      },
                      status: {
                        type: 'integer',
                        example: 200,
                      },
                      message: {
                        type: 'string',
                        example: 'Conversations fetched successfully',
                      },
                    },
                  },
                  examples: {
                    'user-conversations': {
                      summary: 'User conversations list',
                      value: {
                        conversations: [
                          {
                            id: 'conv_123456789',
                            title: 'AI Assistant Chat',
                            messageCount: 5,
                          },
                          {
                            id: 'conv_987654321',
                            title: 'Help with Code',
                            messageCount: 3,
                          },
                        ],
                        status: 200,
                        message: 'Conversations fetched successfully',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'Bad request - missing userId',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
            404: {
              description: 'User not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
      },
      '/api/v1/conversation/{id}': {
        get: {
          tags: ['Conversations'],
          summary: 'Get conversation by ID',
          description: 'Retrieves a specific conversation with all its messages',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID of the conversation to retrieve',
              schema: {
                type: 'string',
                example: 'conv_123456789',
              },
            },
          ],
          responses: {
            200: {
              description: 'Conversation retrieved successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      conversation: { $ref: '#/components/schemas/ConversationWithMessages' },
                      status: {
                        type: 'integer',
                        example: 200,
                      },
                      message: {
                        type: 'string',
                        example: 'Conversation fetched successfully',
                      },
                    },
                  },
                  examples: {
                    'conversation-with-messages': {
                      summary: 'Conversation with messages',
                      value: {
                        conversation: {
                          id: 'conv_123456789',
                          title: 'AI Assistant Chat',
                          userId: 'user_123456789',
                          createdAt: '2023-12-01T10:00:00.000Z',
                          updatedAt: '2023-12-01T10:30:00.000Z',
                          messages: [
                            {
                              id: 'msg_1',
                              parts: [{ text: 'Hello, how can you help me?' }],
                              conversationId: 'conv_123456789',
                              isFromAI: false,
                              createdAt: '2023-12-01T10:15:00.000Z',
                            },
                            {
                              id: 'msg_2',
                              parts: [{ text: 'Hello! I can help you with various tasks. What would you like to know?' }],
                              conversationId: 'conv_123456789',
                              isFromAI: true,
                              createdAt: '2023-12-01T10:16:00.000Z',
                            },
                          ],
                        },
                        status: 200,
                        message: 'Conversation fetched successfully',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'Bad request - missing conversation ID',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
            404: {
              description: 'Conversation not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  examples: {
                    'conversation-not-found': {
                      summary: 'Conversation not found',
                      value: {
                        error: 'Conversation not found',
                        status: 404,
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
        delete: {
          tags: ['Conversations'],
          summary: 'Delete conversation by ID',
          description: 'Deletes a specific conversation and all its messages',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              description: 'ID of the conversation to delete',
              schema: {
                type: 'string',
                example: 'conv_123456789',
              },
            },
          ],
          responses: {
            200: {
              description: 'Conversation deleted successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      deletedConversation: { $ref: '#/components/schemas/Conversation' },
                      status: {
                        type: 'integer',
                        example: 200,
                      },
                      message: {
                        type: 'string',
                        example: 'Conversation deleted successfully',
                      },
                    },
                  },
                  examples: {
                    'deleted-conversation': {
                      summary: 'Successfully deleted conversation',
                      value: {
                        deletedConversation: {
                          id: 'conv_123456789',
                          title: 'AI Assistant Chat',
                          userId: 'user_123456789',
                        },
                        status: 200,
                        message: 'Conversation deleted successfully',
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'Bad request - missing conversation ID',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
            404: {
              description: 'Conversation not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
      },
      '/api/v1/conversation/send': {
        post: {
          tags: ['Conversations'],
          summary: 'Send a message',
          description: 'Sends a message to a conversation and triggers an AI response',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SendMessageRequest' },
                examples: {
                  'text-message': {
                    summary: 'Simple text message',
                    value: {
                      conversationId: 'conv_123456789',
                      parts: [
                        {
                          text: 'Hello, can you help me with JavaScript?',
                        },
                      ],
                    },
                  },
                  'message-with-image': {
                    summary: 'Message with inline image',
                    value: {
                      conversationId: 'conv_123456789',
                      parts: [
                        {
                          text: 'What do you see in this image?',
                        },
                        {
                          inlineData: {
                            mimeType: 'image/jpeg',
                            data: 'iVBORw0KGgoAAAANSUhEUgAAA...',
                          },
                        },
                      ],
                    },
                  },
                  'message-with-file': {
                    summary: 'Message with file reference',
                    value: {
                      conversationId: 'conv_123456789',
                      parts: [
                        {
                          text: 'Please analyze this document',
                        },
                        {
                          fileData: {
                            mimeType: 'application/pdf',
                            uri: 'https://storage.googleapis.com/file123.pdf',
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: 'Message sent successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { $ref: '#/components/schemas/Message' },
                      status: {
                        type: 'integer',
                        example: 201,
                      },
                    },
                  },
                  examples: {
                    'sent-message': {
                      summary: 'Successfully sent message',
                      value: {
                        message: {
                          id: 'msg_123456789',
                          parts: [
                            {
                              text: 'Hello, can you help me with JavaScript?',
                            },
                          ],
                          conversationId: 'conv_123456789',
                          isFromAI: false,
                          createdAt: '2023-12-01T10:15:00.000Z',
                        },
                        status: 201,
                      },
                    },
                  },
                },
              },
            },
            400: {
              description: 'Bad request - invalid message format or missing required fields',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  examples: {
                    'invalid-parts': {
                      summary: 'Invalid parts array',
                      value: {
                        message: 'Invalid message format: Parts array and conversation ID are required.',
                        status: 400,
                      },
                    },
                    'invalid-json': {
                      summary: 'Invalid JSON in parts',
                      value: {
                        error: 'Invalid JSON format for \'parts\' array.',
                        details: 'Unexpected token in JSON at position 0',
                      },
                    },
                  },
                },
              },
            },
            404: {
              description: 'Conversation not found',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  examples: {
                    'conversation-not-found': {
                      summary: 'Conversation not found',
                      value: {
                        error: 'Conversation not found.',
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                  examples: {
                    'server-error': {
                      summary: 'Internal server error',
                      value: {
                        message: 'Internal server error.',
                        error: 'Database connection failed',
                        status: 500,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js', './handlers/*.js'], 
};

module.exports = swaggerOptions;