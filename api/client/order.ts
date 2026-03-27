import { useAuth } from "@/utils/auth-context";
import { useQuery } from "@tanstack/react-query";
import api from "../axios/index";
import API_ROUTE from "../endPoints";
// import { useSelector } from "react-redux";

export function useGetOrderByFreelancer(params = {}) {
  const { freelancer } = useAuth();
  
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const queryKey = [API_ROUTE.order.getAllOrderByFreelancer, params];
  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(
        `${API_ROUTE.order.getAllOrderByFreelancer}/${freelancer.id}?${constructQueryString(params)}`
      ),
  });
  return {
    data: data?.data?.data,
    totalPages: data?.data?.totalPages,
    error,
    isLoading,
    isError,
  };
}

export function useSingleOrderByFreelancer(id) {
  const queryKey = [API_ROUTE.order.getSingleOrderByFreelancer, id];

  return useQuery({
    queryKey: [API_ROUTE.order.getSingleOrderByFreelancer, id],
    queryFn: async () => {
      const response = await api.get(
        `${API_ROUTE.order.getSingleOrderByFreelancer}/${id}`
      );
      return response.data.data;
    },
    enabled: Boolean(id),
  });
}

export function useSingleOrderByClient(id) {
  const queryKey = [API_ROUTE.order.getSingleOrderByClient, id];
  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: async () =>
      await api.get(`${API_ROUTE.order.getSingleOrderByClient}/${id}`),
    // enabled: Boolean(id),
  });
  return { data: data?.data?.data, error, isLoading, isError };
}

export function useGetOrderByClient(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const queryKey = [API_ROUTE.order.getAllOrderByClient, params];
  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(
        `${API_ROUTE.order.getAllOrderByClient}?${constructQueryString(params)}`
      ),
  });
  return {
    data: data?.data?.data,
    totalPages: data?.data?.totalPages,
    error,
    isLoading,
    isError,
  };
}

// Admin orders
export function useGetAllOrderByAdmin(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `?${query}` : "";
  };

  const queryKey = [API_ROUTE.order.getAllOrderByAdmin, params];

  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(
        `${API_ROUTE.order.getAllOrderByAdmin}${constructQueryString(params)}`
      ),
  });

  return {
    data: data?.data?.orders,
    error,
    isLoading,
    isError,
  };
}
