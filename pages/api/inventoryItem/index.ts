import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "db";
import { StatusCodes } from "http-status-codes";
import type { InventoryItem } from "@prisma/client";

type Error = {
  error: string;
};

type DataGet = InventoryItem[];
type DataPost = InventoryItem | Error;

type Data = DataGet | DataPost;

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
      res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse<DataPost>) {
  let inventoryItem = req.body;
  if (!validateInventoryItem(inventoryItem)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Invalid inventory item" });
    return;
  }


  let createdInventoryItem = await prisma.inventoryItem.create({
    data: inventoryItem,
  });

  res.status(StatusCodes.CREATED).json(createdInventoryItem);
}

async function handleGet(req: NextApiRequest, res: NextApiResponse<DataGet>) {
  const inventoryItems = await prisma.inventoryItem.findMany();
  res.status(StatusCodes.OK).json(inventoryItems);
}

function validateInventoryItem(inventoryItem: any) {
  const { name, alcoholPercentage, allergens, pricePerUnit, unitsAvailable } =
    inventoryItem;

    console.log(inventoryItem);
  if (
    name === undefined ||
    name === null ||
    name === "" ||
    alcoholPercentage === undefined ||
    alcoholPercentage === null ||
    allergens === undefined ||
    allergens === null ||
    pricePerUnit === undefined ||
    pricePerUnit === null ||
    unitsAvailable === undefined ||
    unitsAvailable === null
  ) {
    return false;
  }

  //TODO: test validation
  
  if(typeof name !== "string" 
    || typeof alcoholPercentage !== "number"
    || typeof pricePerUnit !== "number"
    || typeof unitsAvailable !== "number"){
    return false;
  }
    

  return true;
}
