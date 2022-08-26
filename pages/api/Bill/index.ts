import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "db";
import { StatusCodes } from "http-status-codes";

type Error = {
    error: string
}
type Bill = Prisma.PromiseReturnType<typeof prisma.bill.create>
type BillItem = Prisma.PromiseReturnType<typeof prisma.billItem.create>
type DataGet = Bill[];
type DataPost = Bill | Error;

type Data = DataGet | DataPost;

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>){
    switch (req.method) {
        case "GET": 
            handleGet(req, res);
            break;
        case "POST":
            handlePost(req, res)
            break;
        default: res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
    }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    const bills = await prisma.bill.findMany({
        include: {
            user: true
        }
    });
    res.status(StatusCodes.OK).json(bills);
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    let bill = req.body
    //TODO: validation
    if(!valdiateBill(bill)){
        res.status(StatusCodes.BAD_REQUEST).json({error: "Invalid bill"})
    }
    console.log(bill);

    let createdBill = await prisma.bill.create({
        data: {
            user: {
                connect: bill.userId
            },
            isPaid: bill.isPaid,
            issuedAt: bill.issuedAt,
            paidAt: bill.paidAt,
            items:{
                createMany: {
                    data: bill.items
                }
            }

        }
    });

    res.status(StatusCodes.OK).json(createdBill);
}

function valdiateBill(bill: any): boolean{

    const {userId, isPaid, issuedAt, paidAt, items} = bill

    if(userId === null || userId === undefined
        || isPaid === null ||isPaid === undefined
        || issuedAt === null || issuedAt === undefined
        || paidAt === null || paidAt === undefined
        || items === null || items === undefined
    ){
        return false;
    }

    if(typeof userId !== "number"
        || typeof isPaid !== "boolean"
        || typeof issuedAt !== "string"
        || typeof paidAt !== "string"
    ){
        return false;
    }

    return true;
}

