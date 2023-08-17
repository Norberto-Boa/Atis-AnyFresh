import { Request, Response } from "express";
import { getAllSalesUseCase } from "./getSalesUseCase";
import { totalPrice } from "../../utils/discountedPrice";


class getAllSalesController{
  async get(req: Request, res: Response) {
    const getSales = new getAllSalesUseCase();
    const data = await getSales.handle();
    const sales = data.map((sale) => {
      const TotalPrice = totalPrice(sale.Product.price, sale.discount, sale.quantity, sale.Product.discountPercentage)
      return { ...sale, TotalPrice }
    });

    return res.status(200).json(sales);
  }
}

export { getAllSalesController };