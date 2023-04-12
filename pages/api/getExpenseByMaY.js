import prisma from '../../lib/client';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: req.body.email,
                },
            })
            const expenses = await prisma.expenses.findMany({
                where: {
                    userId: user.id,
                    month: parseInt(req.body.month),
                    year: parseInt(req.body.year),
                },
                include: {
                    category: {
                        select: {
                            category: true,
                        }
                    }
                }
            });
            res.json(expenses);
            res.status(200).end();
        } catch (error) {
            res.status(error).json({})
            throw error;
        }
    } else {
        res.status(405);
        res.end();
    }
}