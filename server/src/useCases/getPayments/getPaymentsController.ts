import { Request, Response } from "express";
import { getPaymentsUseCase } from "./getPaymentsUseCase";

class getPaymentsController {
  async get(req: Request, res: Response) {
    const { page } = req.query;

    const getPayments = new getPaymentsUseCase();

    const { count, payments } = await getPayments.handle(Number(page));

    return res.status(200).json({ count, payments });
  }
}

export { getPaymentsController };
