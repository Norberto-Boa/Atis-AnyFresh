import { Request, Response } from "express";
import { getAllExpensesUseCase } from "./getTheExpensesUseCase";


class getAllExpensesController{
  async get(req: Request, res: Response) {
    const getAllExpenses = new getAllExpensesUseCase();

    const expenses = await getAllExpenses.handle();

    return res.status(200).json(expenses);
  }
}

export { getAllExpensesController };