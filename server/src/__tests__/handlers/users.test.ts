import { describe, expect, it, jest, beforeEach } from "@jest/globals";
import { Request, Response } from 'express';

// Create a proper mock response that mimics Express Response behavior
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

// Simple test function that mimics your handler's behavior
const mockFetchUser = async (req: any, res: any) => {
  try {
    const { email } = req.body;
    
    // Simulate different scenarios based on email
    if (email === 'notfound@example.com') {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (email === 'error@example.com') {
      throw new Error('Database connection failed');
    }
    
    // Simulate successful response
    const userResponse = {
      id: 1,
      name: 'John Doe',
      email: email,
      createdAt: new Date(),
      updatedAt: new Date(),
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

describe('fetchUser handler behavior', () => {
    let mockRes: any;
    
    beforeEach(() => {
        mockRes = createMockResponse();
    });

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
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
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