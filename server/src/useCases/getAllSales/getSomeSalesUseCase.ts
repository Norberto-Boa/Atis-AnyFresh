import { client } from "../../prisma/client";

class getSomeSalesUseCase {
  async handle(page: number, search: string | undefined) {
    const salesPerPage = 12;

    if (search == "undefined") {
      search = undefined;
    }

    const skip = page === 1 ? 0 : (page - 1) * salesPerPage;

    const [count, sales] = await client.$transaction([
      client.sale.count(),
      client.sale.findMany({
        where: {
          client_name: {
            contains: search,
          },
        },
        include: {
          Product: true,
          Payment: {
            select: {
              amount: true,
              payment_type: true,
            },
          },
        },
        skip: skip,
        take: salesPerPage,
        orderBy: {
          date: "desc",
        },
      }),
    ]);

    return { sales, count };
  }
}

export { getSomeSalesUseCase };
