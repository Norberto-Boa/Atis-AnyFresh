import { Prisma } from "@prisma/client";
import { client } from "../../prisma/client";

class getExpensesUseCase{
  async handle( page : number) {
    const expensesPerPage = 8;
    const start = page === 1 ? 0 : (page - 1) * expensesPerPage;
    const query: Prisma.ExpenseFindManyArgs = {
      orderBy: {
        date: 'desc'
      }, 
      skip: start,
      take: expensesPerPage
    }


    const [count, expenses] = await client.$transaction([
      client.expense.count(),
      client.expense.findMany(query)
    ])

    return {count, expenses} ;
  }
}

export { getExpensesUseCase };