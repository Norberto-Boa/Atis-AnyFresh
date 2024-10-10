import type { NotificationProps } from "@/components/NotificationDialog";
import { api } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const fetchExpensesQuery = async () => {
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

const createExpesnseQuery = async () => {
	const response = await api("/expense");
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
			setFeedback({
				type: "error",
				message: error.message,
			});
		},
	});
};
