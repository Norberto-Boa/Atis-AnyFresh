import type { GetSalesResponse } from "@/types/saleTypes";
import { api } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

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
	return useMutation({
		mutationFn: createSaleQuery,
		onSuccess: () => {
			console.log("Sale added successfully!");
			queryClient.invalidateQueries({ queryKey: ["sales"] });
		},
		onError: (error) => {
			console.log(error);
		},
	});
};
export { useGetSales };
