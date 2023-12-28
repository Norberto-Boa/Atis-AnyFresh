import { client } from "../../prisma/client";

class getPaymentsUseCase {
  async handle(page: number) {
    const paymentPerPage = 10;
    const start = page === 1 ? 0 : (page - 1) * paymentPerPage;

    const query: any = {
      include: {
        sale: {
          select: {
            client_name: true,
            date: true,
            quantity: true,

            Product: {
              select: {
                name: true,
                price: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: "desc",
      },
      skip: start,
      take: paymentPerPage,
    };

    const [count, payments] = await client.$transaction([
      client.payment.count(),
      client.payment.findMany(query),
    ]);

    return { count, payments };
  }
}

export { getPaymentsUseCase };
