import { Request, Response } from "express";
import { getExpensesUseCase } from "./getExpensesUseCase";


class getExpensesController{
  async get(req: Request, res: Response){
    const { page } = req.query;
    

    const getExpenses = new getExpensesUseCase()

    const {count, expenses} = await getExpenses.handle(Number(page));

    return res.status(200).json({expenses, count} );
  }
}

export { getExpensesController };