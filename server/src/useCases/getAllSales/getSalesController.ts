import { Response, Request } from 'express';
import { getSalesUseCase } from "./getSalesUseCase";
import { totalPrice } from "../../utils/discountedPrice";


class getSalesController{
  async get(req: Request, res: Response) {
    const { page } = req.query;

    const pageNumber = page ? Number(page) :  1

    const getSales = new getSalesUseCase();

    const {count, sales}  = await getSales.handle(pageNumber);

    const Sales = sales.map((sale) => {
      const TotalPrice = totalPrice(sale.Product.price, sale.discount, sale.quantity, sale.Product.discountPercentage)
    
      return {...sale, TotalPrice}
    })

    return res.status(200).json({count, Sales});
  }
}

export { getSalesController };
