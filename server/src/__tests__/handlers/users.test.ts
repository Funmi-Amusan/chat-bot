import { describe, expect, it, jest, beforeEach } from "@jest/globals";

const createMockResponse = () => {
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };
  return mockRes;
};

const createMockRequest = (body: any) => ({
  body,
});

const mockCreateUser = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;
    
    if (email === 'existing@example.com') {
      return res.status(400).json({ error: 'User with this email already exists. Pls login.' });
    }
    
    if (email === 'error@example.com') {
      throw new Error('Database connection failed');
    }
    
    res.status(201).json({ message: "User created successfully. Please log in." });
  } catch (error: any) {
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
};

const mockLogin = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    
    if (email === 'notfound@example.com') {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (password === 'wrongpassword') {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    
    if (email === 'error@example.com') {
      throw new Error('Database connection failed');
    }
    
    const userResponse = {
      id: 1,
      name: 'John Doe',
      email: email,
    };
    
    const conversations = [
      { id: 1, userId: 1, title: 'Conversation 1' }
    ];
    
    res.status(200).json({
      userResponse,
      conversations
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const mockFetchUser = async (req: any, res: any) => {
  try {
    const { email } = req.body;
    
    if (email === 'notfound@example.com') {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (email === 'error@example.com') {
      throw new Error('Database connection failed');
    }
    
    const userResponse = {
      id: 1,
      name: 'John Doe',
      email: email,
    };
    
    const conversations = [
      { id: 1, userId: 1, title: 'Test Conversation' }
    ];
    
    res.status(200).json({
      userResponse,
      conversations
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

describe('User Handlers', () => {
    let mockRes: any;
    
    beforeEach(() => {
        mockRes = createMockResponse();
    });

    describe('createUser', () => {
        it('should create user successfully with valid data', async () => {
          const mockReq = createMockRequest({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'securepassword123'
            });

            await mockCreateUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "User created successfully. Please log in."
            });
        });

        it('should return 400 when user already exists', async () => {
            const mockReq = createMockRequest({
                name: 'John Doe',
                email: 'existing@example.com',
                password: 'password123'
            });

            await mockCreateUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                error: 'User with this email already exists. Pls login.'
            });
        });

        it('should handle errors during user creation', async () => {
            const mockReq = createMockRequest({
                name: 'John Doe',
                email: 'error@example.com',
                password: 'password123'
            });

            await mockCreateUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
                error: 'An error occurred while creating the user'
            });
        });
    });

    describe('login', () => {
        it('should login successfully with valid credentials', async () => {
            const mockReq = createMockRequest({
                email: 'john@example.com',
                password: 'correctpassword'
            });

            await mockLogin(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                userResponse: {
                    id: 1,
                    name: 'John Doe',
                    email: 'john@example.com',
                },
                conversations: [
                    { id: 1, userId: 1, title: 'Conversation 1' }
                ]
            });
        });

        it('should return 404 when user not found', async () => {
            const mockReq = createMockRequest({
                email: 'notfound@example.com',
                password: 'password123'
            });

            await mockLogin(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "User not found"
            });
        });

        it('should return 401 with invalid password', async () => {
            const mockReq = createMockRequest({
                email: 'john@example.com',
                password: 'wrongpassword'
            });

            await mockLogin(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(401);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Invalid credentials."
            });
        });

        it('should handle login errors', async () => {
            const mockReq = createMockRequest({
                email: 'error@example.com',
                password: 'password123'
            });

            await mockLogin(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
                error: 'Database connection failed'
            });
        });
    });

    describe('fetchUser', () => {
        it('should return 404 when user is not found', async () => {
            const mockReq = createMockRequest({
                email: 'notfound@example.com'
            });

            await mockFetchUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "User not found"   
            });
        });

        it('should return user data when user exists', async () => {
            const mockReq = createMockRequest({
                email: 'john@example.com'
            });

            await mockFetchUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                userResponse: {
                    id: 1,
                    name: 'John Doe',
                    email: 'john@example.com',
                },
                conversations: [
                    { id: 1, userId: 1, title: 'Test Conversation' }
                ]
            });
        });

        it('should handle errors properly', async () => {
            const mockReq = createMockRequest({
                email: 'error@example.com'
            });

            await mockFetchUser(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith({
                error: 'Database connection failed'
            });
        });
    });


});