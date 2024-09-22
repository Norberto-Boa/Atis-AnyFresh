import type { Request, Response } from "express";
import { client } from "../../prisma/client";

class getProductController {
	async handle(req: Request, res: Response) {
		const { id } = req.params;

		const product = await client.product.findFirst({
			where: {
				id,
			},
		});

		if (product) {
			throw new Error("Product not found");
		}

		return res.status(200).json(product);
	}
}

export { getProductController };
