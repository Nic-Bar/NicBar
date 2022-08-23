// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "db"
import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

type InventoryItem = Prisma.PromiseReturnType<typeof prisma.inventoryItem.create>
type Error = {
  error: string;
};

type DataGet = InventoryItem[]
type DataPost = InventoryItem | Error


type Data = DataGet | DataPost

function checkInvItem(invItem: any): boolean{
  const {id, name, alcoholPercentage, allergens, pricePerUnit, unitsAvailable, isOnMenu} = invItem;

  if (name === undefined || alcoholPercentage === undefined || allergens === undefined || pricePerUnit === undefined || unitsAvailable === undefined){
    return false;
  }

  return true;
}

async function handleGet(req: NextApiRequest, res: NextApiResponse<DataGet>) {
  let inventoryItems = await prisma.inventoryItem.findMany();
  res.status(StatusCodes.OK).json(inventoryItems);
}

async function handlePost(req: NextApiRequest, res: NextApiResponse<DataPost>) {
  let inventoryItem = req.body;
  if (!checkInvItem(inventoryItem)){
    res.status(StatusCodes.BAD_REQUEST).json({error: "Invalid inventory item"});
    return;
  }

  console.log(inventoryItem);

  let created = await prisma.inventoryItem.create({
    data: inventoryItem
  });

  res.status(StatusCodes.OK).json(created);
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      handleGet(req, res);
      break;
    case "POST":
      handlePost(req, res);
      break;
    default:
      res.status(405).end();
      break;
  }
}
