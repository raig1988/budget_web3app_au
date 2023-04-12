import prisma from "@/lib/client";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: req.body.email,
                },
            })
            const expense = await prisma.expenses.create({
                data: {
                    userId: user.id,
                    day: req.body.day,
                    month: req.body.month,
                    year: req.body.year,
                    category_id: req.body.category_id,
                    description: req.body.description,
                    amount: req.body.amount,
                }
            })
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