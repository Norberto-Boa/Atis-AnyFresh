import { client } from "../../prisma/client";

export class DeletePaymentUseCase {
	async handle(id: string) {
		const deletedPayment = await client.payment.deleteMany({
			where: {
				sale_id: id,
			},
		});

		return deletedPayment;
	}
}
