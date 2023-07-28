import { client } from "../../prisma/client";

interface IExpense{
  description: string,
  buyerName: string,
  price: number,
  quantity: number,
  date: string,
  userId: string
}


class createExpenseUseCase {
  async handle({ description, buyerName, price, quantity, date, userId }: IExpense) {
    
    const isUserReal = await client.user.findFirst({
      where: {
        id: userId,
      }
    });

    if (!isUserReal) {
      throw new Error("Este usuario nao existe!");
    }

    const expense = await client.expense.create({
      data: {
        description,
        buyerName,
        price,
        quantity,
        date,
        userId
      }
    });

    return { expense, isUserReal };
  }
}

export { createExpenseUseCase };