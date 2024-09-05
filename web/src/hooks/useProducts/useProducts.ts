import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

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

export { useGetProducts };
