import prisma from "@/lib/client";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    address: req.body.address,
                },
            })
            const aggregate = await prisma.expenses.groupBy({
                by: ['category_id'],
                where: {
                    userId: user.id,
                    month: parseInt(req.body.month),
                    year: parseInt(req.body.year),
                },
                _sum: {
                    amount: true,
                },
            })
            const categories = await prisma.budget.findMany({
                where: {
                    userId: user.id,
                },
                select: {
                    id: true,
                    category: true,
                    amount: true,
                }
            })
            const summary = [];
            for (let i = 0; i < aggregate.length; i++) {
                if (aggregate[i]._sum.amount.countDecimals() > 2) {
                    aggregate[i]._sum['amount'] = parseFloat(aggregate[i]._sum['amount'].toFixed(2))
                }
                for (let j = 0; j < categories.length; j++) {
                    if (aggregate[i].category_id == categories[j].id) {
                        let element = {
                            ...aggregate[i],
                            category: categories[j].category,
                            amount: categories[j].amount,
                            net: parseFloat((categories[j].amount - aggregate[i]._sum.amount).toFixed(2)),
                        }
                        summary.push(element);
                    }
                }
            }
            res.json(summary);
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