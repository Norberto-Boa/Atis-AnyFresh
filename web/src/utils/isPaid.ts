
interface paymentData{
  amount: number,
  payment_type: string
}

function isPaid(totalPrice?: number, payment? : paymentData[]) {
  var totalPaid = 0
  if (totalPrice === null || payment === null || !payment) {
    return {status: false, price: totalPrice ?? 0, paid: totalPaid}
  }

  
  payment.forEach(payment => totalPaid += payment.amount);


  if (totalPrice === totalPaid) {
    return {status: true, price: totalPrice ?? 0, paid: totalPaid};
  }

  return {status: false, price: totalPrice ?? 0, paid: totalPaid};
}

function whatIsPaid(totalPrice: number, payment?: paymentData[]) {
  var totalPaid = 0
  if ( payment === null || !payment) {
    return "Não pago"
  }

  
  payment.forEach(payment => totalPaid += payment.amount);


  if (totalPrice === totalPaid) {
    return payment[0].payment_type;
  } else if (totalPaid !== 0 && totalPaid < totalPrice){
    return `Parcelado ${totalPaid}`;
  }

  return "Nao pago"
}


export { isPaid, whatIsPaid };