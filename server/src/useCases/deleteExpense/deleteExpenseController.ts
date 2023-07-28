import { Request, Response } from "express";
import { deleteExpenseUseCase } from "./deleteExpenseUseCase";


class deleteExpenseController{
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    
    const deleteExpense = new deleteExpenseUseCase;

    const expense = await deleteExpense.handle(id);

    return res.status(200).json(expense);
  }
}

export { deleteExpenseController };