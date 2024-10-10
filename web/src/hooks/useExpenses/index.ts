import type { NotificationProps } from "@/components/NotificationDialog";
import { api } from "@/services/api";
import type { expense } from "@/types/_types";
import type { ExpenseDTO } from "@/types/inputTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const fetchExpensesQuery = async (): Promise<expense[] | []> => {
	const response = await api("/allexpenses");
	const data = await response.data;
	return data;
};

export const useGetExpenses = () => {
	return useQuery({
		queryKey: ["expenses"],
		queryFn: () => fetchExpensesQuery(),
	});
};

const createExpesnseQuery = async (expense: ExpenseDTO) => {
	const response = await api.post("/expense", expense);
	const data = await response.data;
	return data;
};

const useAddExpense = () => {
	const queryClient = useQueryClient();

	const [feedback, setFeedback] = useState<Pick<
		NotificationProps,
		"message" | "type"
	> | null>(null);

	const mutate = useMutation({
		mutationFn: createExpesnseQuery,
		onSuccess: () => {
			setFeedback({
				type: "success",
				message: "Despesa adicionada com sucesso!",
			});

			queryClient.invalidateQueries({
				queryKey: ["expenses"],
			});
		},
		onError: (error) => {
			console.log(error);
			setFeedback({
				type: "error",
				message: error.message,
			});
		},
	});

	return { ...mutate, feedback, setFeedback };
};

export { useAddExpense };
