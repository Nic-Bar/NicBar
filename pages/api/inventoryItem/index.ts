import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "db";
import { StatusCodes } from "http-status-codes";

type Error = {
  error: string;
};
type InventoryItem = Prisma.PromiseReturnType<typeof prisma.inventoryItem.create>;
type DataGet = InventoryItem[];
type DataPost = InventoryItem | Error;


type Data = DataGet | DataPost;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case "GET": handleGet(req, res); break;
    case "POST": handlePost(req, res); break;
    default: res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse<DataPost>) {
  let inventoryItem = req.body;
  if(!validateInventoryItem(inventoryItem)) {
    res.status(StatusCodes.BAD_REQUEST).json({error: "Invalid inventory item"});
    return;
  }

  console.log(inventoryItem);

  let createdInventoryItem = await prisma.inventoryItem.create({
    data: inventoryItem
  });

  res.status(StatusCodes.CREATED).json(createdInventoryItem);
}

async function handleGet(req: NextApiRequest, res: NextApiResponse<DataGet>) {
  const inventoryItems = await prisma.inventoryItem.findMany();
  res.status(StatusCodes.OK).json(inventoryItems);
}

function validateInventoryItem(inventoryItem: any) {
  const {name, alcoholPercentage, allergens, pricePerUnit, unitsAvailable} = inventoryItem;

  if(name === undefined || name === null || name === "" 
    || alcoholPercentage === undefined || alcoholPercentage === null || alcoholPercentage === ""
    || allergens === undefined || allergens === null || allergens === ""
    || pricePerUnit === undefined || pricePerUnit === null || pricePerUnit === ""
    || unitsAvailable === undefined || unitsAvailable === null || unitsAvailable === "") {
    return false;
  }

  //TODO: test validation

  if(name !== "string" 
    || alcoholPercentage !== "number"
    || allergens !== "string"
    || pricePerUnit !== "number"
    || unitsAvailable !== "number"){
    return false;
    }
    

  return true;
}