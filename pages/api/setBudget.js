import prisma from '../../lib/client';

async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const user = await prisma.user.findUnique({
                where: {
                  email: req.body.email,
                },
              })
            const budget = await prisma.budget.create({
                data: {
                  userId: user.id,
                  category: req.body.category,
                  amount: req.body.amount
                },
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

export default handler;