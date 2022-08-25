import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "db";
import { StatusCodes } from "http-status-codes";

type BillItem = Prisma.PromiseReturnType<typeof prisma.billItem.create>