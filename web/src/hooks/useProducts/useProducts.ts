import { api } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { IProductCreate } from "../../types/inputTypes";

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
	return useMutation({
		mutationFn: createProductQuery,
		onSuccess: () => {
			alert("Produto criado com sucesso!");
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
		onError: (error) => {
			console.log(error);
		},
	});
};

export { useGetProducts };
