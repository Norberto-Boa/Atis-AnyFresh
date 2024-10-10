import type { Request, Response } from "express";
import { z } from "zod";
import { checkIfValidUUID } from "../../utils/checkIfValidUUID";
import { createExpenseUseCase } from "./createExpenseUseCase";

class createExpenseController {
	async create(req: Request, res: Response) {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const user = (req as any).user;

		const createExpenseBody = z
			.object({
				description: z
					.string({ required_error: "A descricao deve ser um texto!" })
					.min(2, { message: "A descricao deve ter pelo menos 2 caracteres!" }),
				buyerName: z
					.string({ required_error: "O nome do comprador deve ser um texto!" })
					.min(2, {
						message: "O nome do comprador deve ter pelo menos 2 caracteres!",
					}),
				price: z.number({ required_error: "O preco deve ser um numero!" }),
				quantity: z
					.number({ required_error: "A quantidade deve ser um numero!" })
					.min(1, { message: "Nao pode registar um gasto com quantidade 0." }),
				date: z.string({ required_error: "A data nao esta bem formatada!" }),
			})
			.parse(req.body);

		const { description, buyerName, date, price, quantity } = createExpenseBody;

		const createExpense = new createExpenseUseCase();

		const expense = await createExpense.handle({
			userId: user.sub,
			description,
			date,
			buyerName,
			price,
			quantity,
		});

		return res.status(200).json({ expense });
	}
}

export { createExpenseController };
