import prisma from "lib/prisma";

//implement the GET /trips/:id
//And implement other HTTP methods
//note that post is not here b/c we don't know the id of the trip as this will be created and we'll
//do the POST  in the pages/api/trips/index.js...outside of the [id].js file ..this file
export default async function handler(req, res) {
  if (req.method === "GET") {
    const trip = await prisma.trip.findUnique({
      where: {
        id: parseInt(req.query.id), //note that We wrap req.query.id in parseInt() because the Prisma model expects a number, while req.query.id is a string. So we cast the string to a number with parseInt().
      },
    });
    //add exception for 404 not found if the trip id is not found
    if (!trip) {
      return res.status(404).json({ message: "Not Found" });
    }

    //add status(200) if successful
    res.status(200).json(trip);
  }
  if (req.method === "PUT") {
    const { user, name, start_date, end_date } = req.body;

    await prisma.trip.update({
      data: {
        user,
        name,
        start_date,
        end_date,
      },
      //this tells using the where clause using the id which to update
      where: {
        id: parseInt(req.query.id),
      },
    });

    return res.status(200).end();
  }
  if (req.method === "DELETE") {
    await prisma.trip.delete({
      where: {
        if: parseInt(req.query.id),
      },
    });
    return res.status(200).end();
  }

  res.status(405).json({
    message: "Method Not Allowed",
  });
}
