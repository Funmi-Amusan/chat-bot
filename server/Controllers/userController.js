import prisma from "../db/prisma.js"

export const createUser = async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: `Guest`,
                email: 'guest@gmail.com',   
            }
        });
        await prisma.conversation.create({
            data: {
                title: `Conversation 1`,
                userId: user.id,
            }
        });
        res.status(201).json({
            user
          });

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("error creating user:", error.message);
    }
};
