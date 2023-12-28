import { Response, Request } from "express";
import { getSomeSalesUseCase } from "./getSomeSalesUseCase";
import { totalPrice } from "../../utils/discountedPrice";

interface salesQueryParamters {
  page: number;
  search: string | undefined;
}

class getSomeSalesController {
  async get(req: Request, res: Response) {
    const { page, search } = req.query;

    const pageNumber = page ? Number(page) : 1;

    let searchParam;

    if (typeof search == "string") {
      searchParam = search;
    } else {
      searchParam = undefined;
    }

    const getSales = new getSomeSalesUseCase();

    const { count, sales } = await getSales.handle(pageNumber, searchParam);

    const Sales = sales.map((sale: any) => {
      const TotalPrice = totalPrice(
        sale.Product.price,
        sale.discount,
        sale.quantity,
        sale.Product.discountPercentage
      );

      return { ...sale, TotalPrice };
    });

    return res.status(200).json({ count, Sales });
  }
}

export { getSomeSalesController };
