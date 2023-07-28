import { Request, Response } from "express";
import { getExpensesUseCase } from "./getExpensesUseCase";


class getExpensesController{
  async get(req: Request, res: Response){
    const getExpenses = new getExpensesUseCase()

    const expenses = await getExpenses.handle()

    return res.status(200).json(expenses );
  }
}

export { getExpensesController };