import { api } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IProductCreate } from "../../types/inputTypes";
import { useState } from "react";
import type { NotificationProps } from "@/components/NotificationDialog";

const fetchProductsQuery = async () => {
	const response = await api("/products");
	const data: Product[] = await response.data;
	return data;
};

const useGetProducts = () => {
	return useQuery({
		queryKey: ["products"],
		queryFn: () => fetchProductsQuery(),
	});
};

const createProductQuery = async (product: IProductCreate) => {
	const response = await api.post("/product", product);
	return response;
};

export const useAddProduct = () => {
	const queryClient = useQueryClient();
	const [feedback, setFeedback] = useState<NotificationProps | null>(null);
	const mutation = useMutation({
		mutationFn: createProductQuery,
		onSuccess: () => {
			setFeedback({
				type: "success",
				message: "Produto adicionado com sucesso!",
			});
		},
		onError: (error) => {
			setFeedback({
				type: "error",
				message: `Ocorreu um erro ao adicionar o produto: ${error.message}`,
			});
		},
	});

	return { ...mutation, feedback };
};

export { useGetProducts };
