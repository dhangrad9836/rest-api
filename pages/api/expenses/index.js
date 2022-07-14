import prisma from "lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { trip, name, date, amount, currency } = req.body;

    if (!trip) {
      return res
        .status(400)
        .json({ message: "Missing required paramenter `trip" });
    }
    if (!name) {
      return res
        .status(400)
        .json({ message: "Missing required paramenter `name" });
    }
    if (!amount) {
      return res
        .status(400)
        .json({ message: "Missing required paramenter `amount" });
    }
    if (!currency) {
      return res
        .status(400)
        .json({ message: "Missing required paramenter `currency" });
    }

    await prisma.expense.create({
      data: {
        trip,
        name,
        date,
        amount,
        currency,
      },
    });

    res.status(200).end();
    return;
  }

  res.status(405).json({ message: "Method Not Allowed" });
}
