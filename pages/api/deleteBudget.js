import prisma from "@/lib/client";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      const deleteBudget = await prisma.budget.delete({
        where: {
          id: req.body.id,
        },
      });
      res.status(200).end();
    } catch (error) {
      res.status(error).json({});
      throw error;
    }
  } else {
    res.status(405);
    res.end();
  }
}
