import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

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
