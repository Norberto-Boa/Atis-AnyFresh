export function getTotalOfExpenses(expenses: []): number {
  let totalExpenses = 0;
  expenses.forEach((expense: { quantity: number; price: number }) => {
    totalExpenses += expense.quantity * expense.price;
  });

  return totalExpenses;
}
