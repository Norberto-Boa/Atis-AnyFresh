import { client } from "../../prisma/client";

class getExpensesUseCase{
  async handle() {
    const expenses = await client.expense.findMany({
      orderBy: {
        date: 'desc'
      }
    });

    return expenses ;
  }
}

export { getExpensesUseCase };