import { client } from "../../prisma/client";

class getAllPaymentsUseCase {
  async getAll() {
    const payments = await client.payment.findMany({
      include: {
        sale: {
          select: {
            quantity: true,
            Product: {
              select: {
                price: true,
              },
            },
          },
        },
      },
    });

    return payments;
  }
}

export { getAllPaymentsUseCase };
