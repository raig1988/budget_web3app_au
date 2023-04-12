import prisma from '../../lib/client';

async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const user = await prisma.user.findUnique({
                where: {
                  email: req.body.email,
                },
              })
              res.send(user);
              res.status(200).end()
        } catch(error) {
            res.status(error).json({})
            throw error;
        }
    } else {
        res.status(405);
        res.end();
    }
}

export default handler;