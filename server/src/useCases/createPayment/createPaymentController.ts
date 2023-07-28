import { Request, Response } from "express";
import { z } from "zod";
import { createPaymentUseCase } from "./useCaseCreatePayment";


class createPaymentController{
  async handle(req: Request, res: Response) {
    const {sale_id} = req.params;

    const createPaymentBody = z.object({
      payment_type: z.enum(["Conta-movel", "M-pesa", "Cash", "BIM", "E-mola"]),
      amount: z.number({ required_error: "Insert the amount paid!" }).min(1),
      description: z.string(),
      date: z.string(),
    }).parse(req.body);

    const {payment_type, amount, date, description} = createPaymentBody

    const dateConverted = new Date(date);

    const CreatePaymentUseCase = new createPaymentUseCase();

    const payment = await CreatePaymentUseCase.handle({
      sale_id,
      payment_type,
      amount,
      date: dateConverted,
      description
    });

    return res.status(200).json(payment);

  }
}

export { createPaymentController };