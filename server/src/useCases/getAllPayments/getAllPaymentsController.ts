import { Request, Response } from "express";
import { getPaymentsUseCase } from "./getAllPaymentsUseCase";


class getPaymentsController{
  async get(req: Request, res: Response) {
    const getPayments = new getPaymentsUseCase();
    
    const payments = await getPayments.handle();

    return res.status(200).json(payments);
  }
}

export { getPaymentsController };