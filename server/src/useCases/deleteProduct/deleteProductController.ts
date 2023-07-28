import { Request, Response } from "express";
import { client } from "../../prisma/client";

class deleteProductController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const sales = await client.sale.findMany({
      where: {
          productId: id
        }
      })
      
      if (!sales) {
          const deletedSales = await client.product.update({
              where: {
        id
      }, data: {
        sales: {
          deleteMany: {},
        }
      },
      include: {
          sales: true
        }
      })
    }

    
    const product = await client.product.delete({
      where: {
        id: id,
      },   
    })

    if (!product) {
      throw new Error(`Este produto nao existe na nossa base de dados!`);
    }


    return { product };
  }
}

export { deleteProductController };