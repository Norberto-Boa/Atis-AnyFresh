import { Response, Request } from 'express';
import { getSalesUseCase } from "./getSalesUseCase";
import { totalPrice } from "../../utils/discountedPrice";


class getSalesController{
  async get(req: Request, res: Response) {
    const getSales = new getSalesUseCase();

    const sales  = await getSales.handle();

    const computedSales = sales.sales.map((sale) => {
      const TotalPrice = totalPrice(sale.Product.price, sale.discount, sale.quantity, sale.Product.discountPercentage)
    
      return {...sale, TotalPrice}
    })

    return res.status(200).json(computedSales);
  }
}

export { getSalesController };
