import { Request, Response, NextFunction } from "express";
import { ZodError, ZodObject } from "zod";

const validateMiddleware = (schema: ZodObject) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (error) {
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
