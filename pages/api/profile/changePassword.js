// HELPER FUNCTIONS
import prisma from '../../../lib/client';
import hashPass from '../../../lib/encrypt';

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try {
            if (req.body.password === req.body.confirmPassword) {
                const hashedPassword = await hashPass(req.body.password)
                const updateUser = await prisma.user.update({
                    where: {
                        email: req.body.email,
                    },
                    data: {
                        password: hashedPassword,
                    },
                })
                res.status(200).end();
            }
            res.status(200).end();
        } catch(error) {
            res.status(error).json({})
            throw error;
        }
    } else {
        res.status(405);
        res.end();
    }
}