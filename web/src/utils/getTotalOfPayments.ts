export function getTotalOfPayments(payments: []) {
  let totalPayment = 0;
  payments.forEach((payment: { amount: number }) => {
    totalPayment += payment.amount;
  });

  return totalPayment;
}
