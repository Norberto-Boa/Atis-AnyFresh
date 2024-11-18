import type { GetSalesResponse } from "@/types/saleTypes";
import { api } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { useState } from "react";
import type { NotificationProps } from "@/components/NotificationDialog";

interface SaleDTO {
	client_name: string;
	productId: string;
	quantity: number;
	date: Date;
	discount: boolean;
	paid: number;
}

const fetchSalesQuery = async () => {
	const response = await api("/sales");
	const data: GetSalesResponse = await response.data;
	return data;
};

const useGetSales = () => {
	return useQuery({
		queryKey: ["sales"],
		queryFn: () => fetchSalesQuery(),
	});
};

const createSaleQuery = async (
	sale: SaleDTO,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
): Promise<AxiosResponse<any, any>> => {
	const response = await api.post("/sale", sale);
	return response;
};

export const useAddSale = () => {
	const queryClient = useQueryClient();
	const [feedback, setFeedback] = useState<Pick<
		NotificationProps,
		"message" | "type"
	> | null>(null);

	const mutation = useMutation({
		mutationFn: createSaleQuery,
		onSuccess: () => {
			setFeedback({
				type: "success",
				message: "Venda adicionada com sucesso!",
			});
		},
		onError: (error) => {
			setFeedback({
				type: "error",
				message: `${error.message}`,
			});
		},
	});

	return { ...mutation, feedback, setFeedback };
};

const deleteSaleQuery = async (id: string) => {
	const response = await api.delete(`/sale/${id}`);
	return response;
};

export const useDeleteSale = (id: string) => {
	const [feedback, setFeedback] = useState<Pick<
		NotificationProps,
		"message" | "type"
	> | null>(null);

	const mutation = useMutation({
		mutationFn: () => deleteSaleQuery(id),
		onSuccess: () => {
			setFeedback({
				type: "success",
				message: "Venda Eliminada com sucesso!",
			});

			setTimeout(() => {
				document.location.reload();
			}, 750);
		},
		onError: (error) => {
			setFeedback({
				type: "error",
				message: `${error.message}`,
			});
		},
	});

	return { ...mutation, feedback, setFeedback };
};
export { useGetSales };
