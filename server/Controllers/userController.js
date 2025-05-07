import bcrypt from 'bcrypt';
import prisma from "../db/prisma.js"
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import transporter from '../config/email.js';

// const prisma = new PrismaClient();

// getByUserId
// updateUser
// deleteUser
// getAllUsers



export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
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
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the user' });
        console.log("error creating user:", error.message);
    }
};

export const login = async (req, res) => {
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
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("error logging in:", error.message);
    }
}

export const forgotPassword = async (req, res) => {
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
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                resetToken,
                resetTokenExpires
            }})

            const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    //         const mailOptions = {
    //             to: user.email,
    //             from: 'maryamusan77@gmail.com',
    //             subject: 'Password Reset Request',
    //             text: `You are receiving this because you (or someone else) has requested the reset of the password for your account.\n\n`
    //                   + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
    //                   + `${resetLink}\n\n`
    //                   + `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    //         };
    // try {
    //     await transporter.sendMail(mailOptions);
    // } catch (error) {
    //     console.log('error sending forgot password email:', error); 
    //     return res.status(500).json({ error: 'An error occurred while sending the email.' });
    // }
    
            res.status(200).json({ message: 'If a user with that email exists, a password reset link has been sent.' });
    }
    catch (error) {
        console.error("Error in forgotPassword:", error);
        res.status(500).json({ error: 'An error occurred during the password reset request.' });
    }
}

export const resetPassword = async(req, res) => {
    const {token} = req.params;
    const {password} = req.body;
    const user = await prisma.user.findFirst({
        where: {
            resetToken: token,
            resetTokenExpires: {
                gte: new Date()
            },
        }
            });
    if (!user) {
        return res.status(400).json({ error: 'Password reset token is invalid or expired token' });
    }

const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);
await prisma.user.update({
    where: {
        id: user.id
    },
    data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpires: null
    }
});

// const mailOptions = {
//     to: user.email,
//     from: 'maryamusan77@gmail.com',
//     subject: 'Password Reset Request',
//     text: `You are receiving this because you (or someone else) has requested the reset of the password for your account.\n\n`
//           + `Please click on the following link, or paste this into your browser to complete the process:\n\n`
//           + `${resetUrl}\n\n`
//           + `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
// };

// try {
//     await transporter.sendMail(mailOptions);
// } catch (error) {
//     console.error("Error sending email:", error);
//     return res.status(500).json({ error: 'An error occurred while sending the email.' });
// }


res.status(200).json({ message: 'Password has been reset successfully.' });
}
