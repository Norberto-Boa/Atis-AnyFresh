import { Request, Response } from "express";
import z from "zod";
import { editExpenseUseCase } from "./editExpenseUseCase";

class editExpenseController{
  async edit(req: Request, res: Response) {
    const { id } = req.params;
    
    const editExpenseBody = z.object({
      buyerName: z.string().optional(),
      description: z.string().optional(),
      price: z.number().optional(),
      quantity: z.number().optional(),
      date: z.string().optional(),
    }).parse(req.body);

    const { buyerName, date, description, price, quantity } = editExpenseBody;

    const editExpense = new editExpenseUseCase();

    const expense = await editExpense.handle({
      id,
      buyerName,
      date,
      description,
      price,
      quantity
    });

    return res.status(200).json(expense);
  }
}

export { editExpenseController };