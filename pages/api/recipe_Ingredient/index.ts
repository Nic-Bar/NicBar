import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "db";
import { StatusCodes } from "http-status-codes";

type Recipe_Ingredient = Prisma.PromiseReturnType<typeof prisma.recipe_Ingredient.create>