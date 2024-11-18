import type { expense } from "@/types/_types";

export function getTotalOfExpenses(expenses: expense[] | 0): number {
	let totalExpenses = 0;
	expenses.forEach((expense: { quantity: number; price: number }) => {
		totalExpenses += expense.quantity * expense.price;
	});

	return totalExpenses;
}
