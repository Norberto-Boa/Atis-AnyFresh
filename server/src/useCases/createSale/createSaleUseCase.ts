import { client } from "../../prisma/client";

interface IRcreateSale{
  user: string,
  productId: string,
  quantity: number,
  paid: number,
  date: string,
  discount: boolean,
  client_name: string,
}

class createSaleUseCase {
  async handle({user, productId, quantity, paid, date, discount, client_name }: IRcreateSale) {
    
    const userCreator = await client.user.findFirst({
      where: {
        id:user
      }
    });

    if (!userCreator) {
      throw new Error(`Precisa ser um usuario para criar uma venda!`);
    }

    const product = await client.product.findFirst({
      where: {
        id: productId
      }
    });

    if (!product) {
      throw new Error(`Escolha um produto ja existente!`);
    }

    const sale = await client.sale.create({
      data: {
        userId: user,
        productId,
        quantity,
        paid,
        date,
        discount,
        client_name
      }
    });

    return { sale, product };
  }
}

export { createSaleUseCase };