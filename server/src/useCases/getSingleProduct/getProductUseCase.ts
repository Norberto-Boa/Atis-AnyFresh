import { client } from "../../prisma/client";

class getSingleProductUseCase {
	async getProductById(id: string) {
		return await client.product.findFirst({
			where: {
				id,
			},
		});
	}
	async getProductByCode(code: string) {
		return await client.product.findFirst({
			where: {
				code,
			},
		});
	}
}

export { getSingleProductUseCase };
