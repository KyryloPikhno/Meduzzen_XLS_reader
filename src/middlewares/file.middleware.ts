import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/ApiError";

export const fileMiddleware = {
  checkFileExistence: (req: Request, _: Response, next: NextFunction) => {
    try {
      const file = req.file;
      if (!file) throw new ApiError("file not uploaded.", 400);

      req.file = file;

      next();
    } catch (e) {
      next(e);
    }
  },
};
