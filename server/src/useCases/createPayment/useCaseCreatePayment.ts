import { client } from "../../prisma/client";
import { isPaid } from "../../utils/checkIfSalePaid";

interface IPayment{
  payment_type: string,
  amount: number,
  description: string,
  date: Date,
  sale_id: string
}

class createPaymentUseCase{
  async handle({payment_type, amount, description, date, sale_id }: IPayment) {
    
    const sale = await client.sale.findFirst({
      where: {
        id: sale_id
      },
      include: {
        Payment:{
          select: {
            amount: true
          }
        },
        Product: {
          select: {
            price: true
          }
        }
      }
    });

    if (!sale) {
      throw new Error("Sale was not found!")
    }

    const paymentCheck = isPaid(sale.Product.price, sale.quantity, sale.Payment);

    if (paymentCheck.totalAmount === paymentCheck.totalPrice) {
      throw new Error("Esta divida ja foi paga!");
    }

    const newTotal = paymentCheck.totalAmount + amount

    const trocos = newTotal - paymentCheck.totalPrice;

    if (newTotal > paymentCheck.totalPrice) {
      amount = paymentCheck.totalPrice - paymentCheck.totalAmount
      console.log(amount)
    }

    const payment = await client.payment.create({
      data: {
        payment_type,
        amount,
        date,
        description,
        sale_id
      }
    });

    return {payment, trocos};

  }
}

export { createPaymentUseCase };
