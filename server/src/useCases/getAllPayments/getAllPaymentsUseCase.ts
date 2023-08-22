import { client } from "../../prisma/client";

class getPaymentsUseCase{
  async handle() {
    const payments = await client.payment.findMany({
      include: {
        sale: {
          select: {
            client_name: true,
            date: true,
            quantity: true,
            
            Product: {
              select: {
                name: true,
                price: true
              }
            }
          }
        }
      }
    });

    return payments;
  }
}

export { getPaymentsUseCase };