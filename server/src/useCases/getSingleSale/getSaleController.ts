import { Request, Response } from "express";
import { getSaleUseCase } from "./getSaleUseCase";
import { totalPrice } from "../../utils/discountedPrice";


class getSaleController{
  async get(req: Request, res: Response) {
    const { id } = req.params;
    
    const getSale = new getSaleUseCase();

    const sale = await getSale.handle(id);

    if (!sale) {
      throw new Error(`Sale was not found`);
    }


    return res.status(200).json({ sale });
  }
}

export { getSaleController };