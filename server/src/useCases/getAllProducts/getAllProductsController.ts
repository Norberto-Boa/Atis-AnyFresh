import { NextFunction, Request, Response } from "express";
import { client } from "../../prisma/client";

class getAllProductsController {
  async handle(req: Request, res: Response) {
    
    const products = await client.product.findMany({
      orderBy: {
        sales: {
          _count: 'desc'
        }
      }, 
      include: {
        _count: {
          select: {
            sales: true
          }
        }
      }
    })

    return res.status(200).json(products);
  }
}

export { getAllProductsController };