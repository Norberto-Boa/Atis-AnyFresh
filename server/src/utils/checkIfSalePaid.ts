


type payment = {
  amount: number
}

function isPaid(price: number, quantity: number, payments: payment[]) {

  const totalPrice = price * quantity;
  var totalAmount = 0;

  payments.forEach(payment => {
    return totalAmount += payment.amount
  });

  return { totalPrice, totalAmount };
}

export {isPaid}