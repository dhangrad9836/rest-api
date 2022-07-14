import prisma from "lib/prisma";

//we want to limit our api here to only respond to GET requests so we need to change our code to only allow GET requests

export default async function handler(req, res) {
  if (req.method === "GET") {
    const trips = await prisma.trip.findMany();

    //the Promise is used to wait for all the prisma.expense.findMany...it waits for all to execute
    await Promise.all(
      trips.map(async (trip) => {
        trip.expenses = await prisma.expense.findMany({
          where: {
            trip: trip.id,
          },
        });
      })
    );

    res.status(200).json(trips);
    return;
  }
  if (req.method === "POST") {
    console.log(req.body);

    const { user, name, start_date, end_date } = req.body;

    if (!user) {
      return res
        .status(400)
        .json({ message: "Missing required parameter `user`" });
    }
    if (!name) {
      return res
        .status(400)
        .json({ message: "Missing required parameter `name`" });
    }

    await prisma.trip.create({
      data: {
        user,
        name,
        start_date,
        end_date,
      },
    });

    res.status(200).end(); //the .end() is to send the response to the client
    return;
  }

  res.status(405).json({
    message: "Method Not Allowed",
  });
}

//remember that the .json takes in an object and will transform to JSON and render as a string to the client
