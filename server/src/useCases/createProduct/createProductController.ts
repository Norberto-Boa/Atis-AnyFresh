import { z } from "zod";
import { createProductUseCase } from "./createProductUseCase";
import { NextFunction, Request, Response } from "express";

class createProductController {
  async handle(req: Request, res: Response) {
    const createProductBody = z.object({
      name: z
        .string({
          required_error: "Todo producto deve ter um nome",
          invalid_type_error: "Producto não pode ser número!"
        })
        .trim()
        .min(4, { message: 'O nome do producto deve ter no minimo 4 letras!' }),
      code: z
        .string({
          required_error: "O producto deve ter um codigo!",
          invalid_type_error: "O codigo não pode ser um número!"
        })
        .trim()
        .min(2, "O codigo deve ter no minimo 2 caracteres!"),
      discountPercentage: z.number(),
      price: z.number({
        required_error: "Producto deve ter um preco!",
        invalid_type_error: "Preco deve ser um numero."
      }),
      bannerUrl: z.string().url()
    }).parse(req.body);



    // Get data from body
    const { name, code, discountPercentage, price, bannerUrl } = createProductBody;

    const createNewProduct = new createProductUseCase();

    const product = await createNewProduct.execute({
      name,
      code,
      discountPercentage,
      price,
      bannerUrl
    })


    return res.status(200).json(product);
  }
}

export { createProductController };