import prisma from "@/lib/client";

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try {
            const updateBudget = await prisma.budget.update({
                where: {
                    id: req.body.id,
                },
                data: {
                    amount: req.body.amount,
                }
            })
            res.status(200).end();
        } catch(error) {
            res.status(error).json({});
            throw error;
        }
    } else {
        res.status(405);
        res.end();
    }
}