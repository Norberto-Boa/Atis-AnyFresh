import { client } from "../../prisma/client";
import { totalPrice } from "../../utils/discountedPrice";

class getSaleUseCase {
  async handle(id: string){
    const sale = await client.sale.findUnique({
      where: {
        id
      },
      include: {
        Product: true
      }
    })

    if (!sale) {
      throw new Error(`Could not find the sale`);
    }

    return sale;
  }
}

export { getSaleUseCase };