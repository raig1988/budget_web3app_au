import prisma from "../../lib/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      });
      const budget = await prisma.budget.findMany({
        where: {
          userId: user.id,
        },
      });
      res.status(200).end();
      return budget;
    } catch (error) {
      res.status(error).json({});
      throw error;
    }
  } else {
    res.status(405);
    res.end();
  }
}
