import { Prisma } from '@prisma/client'
import hashPass from '../../lib/encrypt';
import prisma from '../../lib/client';


async function handler(req, res) {
    if (req.method === 'POST') {
        try {
          if (req.body.password === req.body.confirmPassword) {
            const hashedPassword = await hashPass(req.body.password);
            const user = await prisma.user.create({
                data: {
                  email: req.body.email,
                  password: hashedPassword,
                },
            })
            res.status(200).end();
          } else {
            res.status(200).end();
          }
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