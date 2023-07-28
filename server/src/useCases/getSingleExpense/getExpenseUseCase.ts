import { client } from "../../prisma/client";

class getExpenseUseCase {
  async handle(id: string){
    const expense = await client.expense.findFirst({
      where: {
        id
      },
    });
    
    if (!expense) {
      throw new Error("Nao existe nenhum gasto com esse ID")
    }

    const user = await client.user.findFirst({
      where: {
        id: expense?.userId
      }
    });

    return { expense, user };
  }
}

export { getExpenseUseCase };