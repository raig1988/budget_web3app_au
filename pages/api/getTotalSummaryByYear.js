import prisma from "@/lib/client";

Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0; 
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: req.body.email,
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
                aggregate[i].month == 1 ? aggregate[i].monthName = "January" 
                : aggregate[i].month == 2 ? aggregate[i].monthName = "February" 
                : aggregate[i].month == 3 ? aggregate[i].monthName = "March" 
                : aggregate[i].month == 4 ? aggregate[i].monthName = "April" 
                : aggregate[i].month == 5 ? aggregate[i].monthName = "May" 
                : aggregate[i].month == 6 ? aggregate[i].monthName = "June" 
                : aggregate[i].month == 7 ? aggregate[i].monthName = "July" 
                : aggregate[i].month == 8 ? aggregate[i].monthName = "August" 
                : aggregate[i].month == 9 ? aggregate[i].monthName = "September" 
                : aggregate[i].month == 10 ? aggregate[i].monthName = "October" 
                : aggregate[i].month == 11 ? aggregate[i].monthName = "November" 
                : aggregate[i].month == 12 ? aggregate[i].monthName = "December" : null;
                if (aggregate[i]._sum.amount.countDecimals() > 2) {
                    aggregate[i]._sum['amount'] = parseFloat(aggregate[i]._sum['amount'].toFixed(2))
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

            res.json({ summaryYear, aggregateMonth, summaryCategory});
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