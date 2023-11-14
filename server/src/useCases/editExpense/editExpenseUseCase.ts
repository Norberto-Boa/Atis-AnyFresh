import { client } from "../../prisma/client";

interface editExpense{
  id: string, 
  buyerName?: string,
  description?: string,
  date?: string,
  price?: number,
  quantity?: number
}


class editExpenseUseCase{
  async handle({id, buyerName, date, description, price, quantity}: editExpense) {
    const expense = await client.expense.update({
      where: {
        id
      },
      data: {
        buyerName: buyerName || undefined,
        date: date || undefined,
        description: description || undefined,
        price: price || undefined,
        quantity: quantity || undefined
      }
    })
    return expense;
  }
}

export { editExpenseUseCase };