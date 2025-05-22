import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Request, Response } from 'express';
import prisma from '../db/prisma';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import { CreateUserQueryParams } from '../types/query-params';


export const createUser = async (req: Request<{}, {}, CreateUserDto>, res: Response) => {
    try {
      const {name, email, password} = req.body;
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists. Pls login.' });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        });
        await prisma.conversation.create({
            data: {
                title: `Conversation 1`,
                userId: user.id,
            }
        });
        const userResponse = {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
        res.status(201).json({ message: "User created successfully. Please log in." });
    } catch (error: any) {
        res.status(500).json({ error: 'An error occurred while creating the user' });
        console.log("error creating user:", error.message);
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        const conversations = await prisma.conversation.findMany({
            where: {
                userId: user.id
            }
        });
        const userResponse = {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
        res.status(200).json({
            userResponse,
            conversations
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
        console.log("error logging in:", error.message);
    }
}

export const fetchUser = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
      
        const conversations = await prisma.conversation.findMany({
            where: {
                userId: user.id
            }
        });
        const userResponse = {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
        console.log('successfully logged in');
        res.status(200).json({
            userResponse,
            conversations
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
        console.log("error logging in:", error.message);
    }
}
