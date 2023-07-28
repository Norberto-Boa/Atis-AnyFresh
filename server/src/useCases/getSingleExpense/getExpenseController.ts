import { Request, Response } from "express";
import { checkIfValidUUID } from "../../utils/checkIfValidUUID";
import { getExpenseUseCase } from "./getExpenseUseCase";

class getExpenseController{
  async get(req: Request, res: Response) {
    const { id } = req.params;
    
    // if (checkIfValidUUID(id)) {
    //   throw new Error("O id inserido é invalido!");
    // }

    const getExpense = new getExpenseUseCase();

    const expense = await getExpense.handle(id);

    return res.status(200).json(expense);
  }
}

export { getExpenseController };