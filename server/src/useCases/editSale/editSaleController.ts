import { Request, Response } from "express";
import { z } from "zod";
import { editSaleUseCase } from "./editSaleUseCase";


class editSaleController{
  async edit(req: Request, res: Response){
    const { id } = req.params;

    const saleBody = z.object({
      quantity: z.number().optional(),
      date: z.string().optional(),
      productId: z.string().optional(),
      discount: z.boolean().optional(),
      client_name: z.string().optional()
    }).parse(req.body);

    const { quantity, date, productId, discount, client_name } = saleBody;
    
    const editSale = new editSaleUseCase();

    const sale = await editSale.handle({
      id,
      client_name,
      productId,
      date,
      discount,
      quantity
    });

    return res.status(200).json(sale);
  }
}

export { editSaleController };