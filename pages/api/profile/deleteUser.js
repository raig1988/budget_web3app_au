import prisma from "@/lib/client";

export default async function handler(req, res) {
    console.log(req.body)
    if (req.method === 'DELETE') {
        try {
            const deleteUser = await prisma.user.delete({
                where: {
                    email: req.body.email,
                },
            });
            res.status(200).end();
        } catch(error) {
            res.status(error).json({});
            throw error
        }
    } else {
        res.status(405);
        res.end();
    }
}