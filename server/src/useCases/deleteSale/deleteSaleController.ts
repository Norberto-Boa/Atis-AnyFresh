import { Request, Response } from "express";
import { deleteSaleUseCase } from "./deleteSaleUseCase";

class deleteSaleController{
  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleteSale = new deleteSaleUseCase();

    const sale = await deleteSale.handle(id);

    return res.status(200).json({ message: "Done!" });
  }
}

export { deleteSaleController };