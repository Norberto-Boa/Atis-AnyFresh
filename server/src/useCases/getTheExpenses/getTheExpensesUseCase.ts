import { client } from "../../prisma/client";

class getAllExpensesUseCase{
  async handle() {
    const expenses = await client.expense.findMany({});

    return expenses
  }
}

export { getAllExpensesUseCase };