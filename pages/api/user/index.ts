import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "db";
import { StatusCodes } from "http-status-codes";

type Error = {
    error: string;
};

type User = Prisma.PromiseReturnType<typeof prisma.user.create>
type DataGet = User[];
type DataPost = User | Error;

type Data = DataGet | DataPost;

export default function handler(
    req: NextApiRequest, 
    res: NextApiResponse<Data>) {

    switch (req.method) {
        case "GET": 
            handleGet(req, res); 
            break;
        case "POST": 
            handlePost(req, res); 
            break;
        default: res.status(StatusCodes.METHOD_NOT_ALLOWED).end();
    }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse<DataGet>) {
    const users = await prisma.user.findMany();
    res.status(StatusCodes.OK).json(users);
}

async function handlePost(req: NextApiRequest, res: NextApiResponse<DataPost>) {
    let user = req.body;
    if(!validateUser(user)) {
        res.status(StatusCodes.BAD_REQUEST).json({error: "Invalid user"});
        return;
    }

    console.log(user);
    

    let createdUser = await prisma.user.create({
        data: user
    });
    

    res.status(StatusCodes.CREATED).json(createdUser);
}

async function validateUser(user: any) {
    const {name, email, password} = user;

    if(name === undefined || name === null || name === "" 
        || email === undefined || email === null || email === ""
        || password === undefined || password === null || password === "") {
        return false;
    }

    if(name !== "string" || email !== "string" || password !== "string") {
        return false;
    }
}
