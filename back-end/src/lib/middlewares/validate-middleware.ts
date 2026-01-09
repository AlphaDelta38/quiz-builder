import { Request, Response, NextFunction } from "express";
import { ZodError, ZodObject } from "zod";
import type { ParamsDictionary } from "express-serve-static-core";
import type { ParsedQs } from "qs";

const validateMiddleware = (schema: ZodObject) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      
      (res.locals as any).validated = parsed;

      return next();
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          errors: error.issues.map((e) => ({
            field: e.path.join("."), 
            message: e.message,
          })),
        });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };

export default validateMiddleware;
