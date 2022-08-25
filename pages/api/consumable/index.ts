import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "db";
import { StatusCodes } from "http-status-codes";

type Consumable = Prisma.PromiseReturnType<typeof prisma.consumable.create>;

type DataGet = Consumable[];
type DataPost = Consumable;
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

async function handleGet(req: NextApiRequest, res: NextApiResponse<DataGet>) {
  let consumables = await prisma.consumable.findMany({
    include: {
      inventoryItem: true,
    }
  });
  res.status(StatusCodes.OK).json(consumables);
}

async function handlePost(req: NextApiRequest, res: NextApiResponse<Consumable>){
  let consumable = req.body;

  //TODO: validation of Consumeable
  if(!validateConsumbale(consumable)){
    res.status(StatusCodes.BAD_REQUEST)
  }

  let data;
  if(consumable.inventoryItemId === null || consumable.inventoryItemId === undefined){
    data = {
      recipe: {
        connect: {
          id: consumable.recipeId
        }
      },
      price: consumable.price
    }
  }
  else{
    data = {
      inventoryItem: {
        connect: {
          id: consumable.inventoryItemId
        }
      },
      price: consumable.price
    }
  }
  console.log(consumable);
  

  let createdConsumeable = await prisma.consumable.create({
    data: data
  })
  res.status(StatusCodes.CREATED).json(createdConsumeable);
}

function validateConsumbale(consumable: any){
  const {inventoryItemId, recipeId, price} = consumable;

  if(((inventoryItemId === undefined || inventoryItemId === null) && (recipeId === null || recipeId === undefined) ||
      (inventoryItemId !== undefined && inventoryItemId !== null) && (recipeId !== null && recipeId !== undefined) ||
      price <= 0)){
        return false;
      }

  return true;
}
