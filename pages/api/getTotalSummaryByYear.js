import prisma from "@/lib/client";
import { setMonthName } from "@/lib/helperFunctions";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    address: req.body.address,
                },
            })
            const aggregate = await prisma.expenses.groupBy({
                by: ['category_id', 'month'],
                where: {
                    userId: user.id,
                    year: parseInt(req.body.year),
                },
                _sum: {
                    amount: true,
                },
                orderBy: {
                    month: 'asc',
                },
            })
            const categories = await prisma.budget.findMany({
                where: {
                    userId: user.id,
                },
                select: {
                    id: true,
                    category: true,
                }
            })
            const summaryYear = [];
            for (let i = 0; i < aggregate.length; i++) {
                setMonthName(aggregate[i]);
                if (aggregate[i]._sum.amount.countDecimals() > 2) {
                    aggregate[i]._sum['amount'] = parseFloat(aggregate[i]._sum['amount'].toFixed(2));
                }
                for (let j = 0; j < categories.length; j++) {
                    if (aggregate[i].category_id == categories[j].id) {
                        let element = {
                            ...aggregate[i],
                            category: categories[j].category,
                        }
                        summaryYear.push(element);
                    }
                }
            }
            const aggregateMonth = await prisma.expenses.groupBy({
                by: ['month'],
                where: {
                    userId: user.id,
                    year: parseInt(req.body.year),
                },
                _sum: {
                    amount: true,
                },
                orderBy: {
                    month: 'asc',
                },
            })
            for (let i = 0; i < aggregateMonth.length; i++) {
                setMonthName(aggregateMonth[i]);
            }
            const aggregateCategory = await prisma.expenses.groupBy({
                by: ['category_id'],
                where: {
                    userId: user.id,
                    year: parseInt(req.body.year),
                },
                _sum: {
                    amount: true,
                },
            })
            const summaryCategory = []
            for (let i = 0; i < aggregateCategory.length; i++) {
                for (let j = 0; j < categories.length; j++) {
                    if (aggregateCategory[i].category_id == categories[j].id) {
                        let element = {
                            ...aggregateCategory[i],
                            category: categories[j].category,
                        }
                        summaryCategory.push(element);
                    }
                }
            }

            res.json({ summaryYear, aggregateMonth, summaryCategory });
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