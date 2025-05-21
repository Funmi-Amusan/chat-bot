import { jest } from "@jest/globals";
import { Request, Response } from "express-serve-static-core"

export const mockRequest = {

} as Request

export const mockResponse = () => ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  });