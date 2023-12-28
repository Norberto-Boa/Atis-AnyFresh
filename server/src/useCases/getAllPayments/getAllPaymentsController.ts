import { Request, Response } from "express";
import { getAllPaymentsUseCase } from "./getAllPaymentsUseCase";

class getAllPaymentsController {
  async get(req: Request, res: Response) {
    const getAllPayments = new getAllPaymentsUseCase();

    const payments = await getAllPayments.getAll();

    return res.status(200).json(payments);
  }
}

export { getAllPaymentsController };
