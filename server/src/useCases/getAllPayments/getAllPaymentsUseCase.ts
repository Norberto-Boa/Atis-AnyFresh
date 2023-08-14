import { client } from "../../prisma/client";

class getPaymentsUseCase{
  async handle() {
    const payments = await client.payment.findMany();

    return payments;
  }
}

export { getPaymentsUseCase };