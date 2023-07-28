import { client } from "../../prisma/client";

class getSalesUseCase{
  async handle() {
    const sales = await client.sale.findMany({
      include: {
        Product: true,
        Payment: {
          select: {
            amount: true,
            payment_type: true
          }
        }
      }
    });

    return { sales };
  }
}

export { getSalesUseCase };