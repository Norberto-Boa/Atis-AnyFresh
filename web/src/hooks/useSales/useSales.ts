import type { GetSalesResponse } from "@/types/saleTypes";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

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

export { useGetSales };
