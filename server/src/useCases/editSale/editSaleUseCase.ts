import { client } from "../../prisma/client";

interface IEditSale{
  id: string;
  productId?: string;
  quantity?: number;
  client_name?: string;
  discount?: boolean;
  date?: string;
}

class editSaleUseCase{
  async handle({client_name, date, discount, id, productId, quantity }: IEditSale) {
    // const product = await client.product.findFirst({
    //   where: {
    //     id: productId
    //   }
    // });

    // if (!product) {
    //   throw new Error(`Escolha um produto ja existente!`);
    // }

    const sale = await client.sale.update({
      where: {
        id
      },
      data: {
        client_name: client_name || undefined,
        date: date || undefined,
        discount: discount || undefined,
        quantity: quantity || undefined,
        productId: productId || undefined,
      }
    })

    return sale;
  }
}

export { editSaleUseCase };