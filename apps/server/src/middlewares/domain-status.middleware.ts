import { prisma } from "@/lib/prisma-orm/prisma.js";
import { NextFunction, Request, Response } from "express";
import { AppError } from "./error.middleware.js";

export const checkDomainStatusMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const domainId = req.domain.id;
  const domain = await prisma.domain.findUnique({
    where: {
      id: domainId,
    },
  });

  if (domain && domain.status === "INACTIVE") {
    throw new AppError(`Invalid Domain activation`, 401);
  }

  next();
};
