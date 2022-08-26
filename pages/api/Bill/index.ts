import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "db";
import { StatusCodes } from "http-status-codes";
import type { Bill } from "utils/types";

type Error = {
    error: string
}
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

    console.log(bill);

    let createdBill = await prisma.bill.create({
        data: bill
    })
}

// function valdiateBill(bill: any): boolean{
//     const {userId, } = bill
// }