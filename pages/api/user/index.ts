import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "db";
import { StatusCodes } from "http-status-codes";
import type { User } from "@prisma/client";
