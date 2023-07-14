import prisma from "@/lib/client";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    address: req.body.address,
                },
            })
            const budgetStatus = await prisma.budget.groupBy({
                by: ['budgetStatus'],
                where: {
                    userId: user.id,
                },
              })
            res.json(budgetStatus);
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