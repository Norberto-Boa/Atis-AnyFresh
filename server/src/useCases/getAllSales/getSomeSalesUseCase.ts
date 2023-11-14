import { client } from "../../prisma/client";



class getSomeSalesUseCase{
  async handle(page: number ) {
    const salesPerPage = 12;

    const skip = page === 1 ? 0 : (page - 1) * salesPerPage;


    const [count, sales] = await client.$transaction([
      client.sale.count(),
      client.sale.findMany({
        include: {
          Product: true,
          Payment: {
            select: {
              amount: true,
              payment_type: true
            }
          }
        },
        skip: skip,
        take: salesPerPage,
        orderBy: {
          date: "desc"
        }
      })
    ]);

    return { sales, count };
  }
}

export { getSomeSalesUseCase };