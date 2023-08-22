import { client } from "../../prisma/client";

class getAllExpensesUseCase{
  async handle() {
    const expenses = await client.expense.findMany({
      orderBy: {
        date: "asc"
      }
    });

    return expenses
  }
}

export { getAllExpensesUseCase };