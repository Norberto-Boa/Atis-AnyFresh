import { client } from "../../prisma/client";

class deleteSaleUseCase {
  async handle(id : string) {
    const sale = await client.sale.delete({
      where: {
        id
      },
      include: {
        Product: true
      }
    });

    return sale;
  }
}

export { deleteSaleUseCase };