import prisma from "@/lib/client";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    address: req.body.address,
                },
            })
            const monthStatus = await prisma.expenses.groupBy({
                by: ['monthStatus'],
                where: {
                    userId: user.id,
                    month: parseInt(req.body.month),
                    year: parseInt(req.body.year),
                },
            })
            res.json(monthStatus);
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