import { Request, Response, NextFunction } from 'express';

const tryCatch = (controller:any) => async (req: Request, res: Response, next: NextFunction) => { 
  try {
    await controller(req, res);
  } catch (error : unknown) {
    if (error instanceof Error) {
      return next({
        status: "Error",
        message: error.message
      })
    }

    return next(error);
  }
}

export { tryCatch };
