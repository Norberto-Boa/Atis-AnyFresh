import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const fetchSalesQuery = async () => {
  const response = await api("/sales");
  const data = await response.data;
  console.log(data);
  return data;
};

const getSales = () => {
  return useQuery({
    queryKey: ["sales"],
    queryFn: () => fetchSalesQuery(),
  });
};

export { getSales };
