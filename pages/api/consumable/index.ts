import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "db";
import { StatusCodes } from "http-status-codes";

type Consumable = Prisma.PromiseReturnType<typeof prisma.consumable.create>;

type DataGet = Consumable[];
type Data = DataGet;


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      handleGet(req, res);
      break;
    default:
      res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse<DataGet>) {
  let consumables = await prisma.consumable.findMany({
    include: {
      inventoryItem: true,
    }
  });
  res.status(StatusCodes.OK).json(consumables);
}