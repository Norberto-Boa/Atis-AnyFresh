
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

function whatIsPaid(totalPrice: number, payment?: paymentData[]) {
  var totalPaid = 0
  if ( payment === null || !payment) {
    return "Nao pago"
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