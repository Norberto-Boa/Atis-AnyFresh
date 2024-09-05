import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const fetchPaymentsQuery = async () => {
  const response = await api("/allpayments");
  const data = await response.data;
  return data;
};

export const useGetPayments = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: () => fetchPaymentsQuery(),
  });
};
