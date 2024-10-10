import { api } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IProductCreate } from "../../types/inputTypes";
import { useEffect, useState } from "react";
import type { NotificationProps } from "@/components/NotificationDialog";
import type { ResponseError } from "@/types/_types";

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

	const [feedback, setFeedback] = useState<Pick<
		NotificationProps,
		"message" | "type"
	> | null>(null);

	const mutation = useMutation({
		mutationFn: createProductQuery,
		onSuccess: () => {
			setFeedback({
				type: "success",
				message: "Produto adicionado com sucesso!",
			});

			queryClient.invalidateQueries({
				queryKey: ["products"],
			});
		},
		onError: (error: ResponseError) => {
			setFeedback({
				type: "error",
				message: `${error.response?.data?.message}`,
			});
		},
	});

	return { ...mutation, feedback, setFeedback };
};

export { useGetProducts };
