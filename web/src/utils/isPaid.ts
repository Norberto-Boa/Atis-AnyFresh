
interface paymentData{
  amount: number,
  payment_type: string
}

function isPaid(totalPrice?: number, payment? : paymentData[]) {
  var totalPaid = 0
  if (totalPrice === null || payment === null || !payment) {
    return
  }

  
  payment.forEach(payment => totalPaid += payment.amount);


  if (totalPrice === totalPaid) {
    return true;
  }

  return totalPaid;
}

export { isPaid };