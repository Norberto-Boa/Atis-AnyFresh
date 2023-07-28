import { Request, Response } from "express";
import { z } from "zod";
import { createSaleUseCase } from "./createSaleUseCase";


class createSaleController{
  async create(req: Request, res: Response) {
    const { user } = req.headers;
    
    if (typeof user != 'string') {
      throw new Error(`Invalid user`);
    }

    const saleBody = z.object({
      quantity: z.number().min(1, { message: "A quantidade deve ser no minimo 1!" }),
      paid: z.number(),
      date: z.string(),
      productId: z.string().uuid(),
      discount: z.boolean(),
      client_name: z.string()
    }).parse(req.body);

    const { quantity, paid, date, productId, discount, client_name } = saleBody;

    const createSale = new createSaleUseCase();

    const sale = await createSale.handle({
      user,
      quantity,
      productId,
      date,
      paid,
      discount,
      client_name
    });

    return res.status(200).json(sale);
  }
}

export { createSaleController };