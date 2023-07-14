import { Prisma } from '@prisma/client' // for instanceOf in register
// import hashPass from '../../lib/encrypt';
import prisma from '../../lib/client';



async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const user = await prisma.user.create({
                data: {
                  address: req.body.address,
                },
            })

            res.status(200).end();
        } catch (err) {
          if (err instanceof Prisma.PrismaClientKnownRequestError) {
            // https://www.prisma.io/docs/reference/api-reference/error-reference
            throw err.code;
          }
          else {
            throw err;
          }
        }
      } else {
        res.status(405);
        res.end();
      }
}

export default handler;