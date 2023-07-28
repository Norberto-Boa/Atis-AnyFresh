import { client } from "../../prisma/client";

class deleteExpenseUseCase{
  async handle(id: string) {
    
    const expense = await client.expense.delete({
      where: {
        id
      }
    });

    if (!expense) {
      throw new Error(`Nao encontramos o gasto na base de dados!`);
    }

    return { expense };
  }
}

export { deleteExpenseUseCase };