import { useAuth } from "@/utils/auth-context";
import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import api from "../axios/index";
import API_ROUTE from "../endPoints";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

export function useAddDispute() {
  const queryClient = useQueryClient();
  const {
    mutate: addDispute,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.dispute.addDispute}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      toast.success("Dispute Added successfully!");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.order.getAllOrderByClient],
      });
    },
    onError: (error) => {
      toast.error("Error In Addding Dispute!");
    },
  });
  return { addDispute, isSuccess, isPending, isError, error };
}

export function useAddDisputeResponse() {
  const queryClient = useQueryClient();
  const {
    mutate: addDisputeResponse,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.dispute.addResponseDispute}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      toast.success("Responeded successfully!");
      // queryClient.invalidateQueries({
      //   queryKey: [API_ROUTE.order.getAllOrderByClient],
      // });
    },
    onError: (error) => {
      toast.error("Failed to respond Dispute!");
    },
  });
  return { addDisputeResponse, isSuccess, isPending, isError, error };
}

// export function useGetAllDisputeByClient(params = {}) {
//   const constructQueryString = (params) => {
//     const query = new URLSearchParams(params).toString();
//     return query ? `&${query}` : "";
//   };

//   const { data, isSuccess, isPending, isError, isLoading, error } = useQuery({
//     queryKey: [API_ROUTE.dispute.getAllDisputeByClient, params],
//     queryFn: async () =>
//       await api.get(
//         `${API_ROUTE.dispute.getAllDisputeByClient}?${constructQueryString(
//           params
//         )}`
//       ),
//     // enabled: id !== undefined && id !== null,
//     // refetchOnWindowFocus: true,
//     // staleTime: 0,
//     // refetchOnMount: true,
//   });
//   return {
//     data: data?.data?.data,
//     totalPages: data?.data?.totalPages,
//     isSuccess,
//     isPending,
//     isError,
//     isLoading,
//     error,
//   };
// }

export function useGetAllDisputeByClient(params = {}) {
  const queryClient = useQueryClient();

  const constructQueryString = (params: any) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const queryKey = [API_ROUTE.dispute.getAllDisputeByClient, params];
  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isPending,
    isLoading,
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      api.get(
        `${API_ROUTE.dispute.getAllDisputeByClient}?page=${pageParam}${constructQueryString(
          params
        )}`
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = lastPage.data.data.length ? pages.length + 1 : undefined;
      return nextPage;
    },
  });

  return {
    data: data?.pages?.flatMap((page) => page?.data?.data) ?? [],
    status,
    error: error?.message || null,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isPending,
    isFetching,
  };
}

export function useGetAllDisputeByFreelancer(params = {}) {
  const { freelancer } = useAuth();
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const { data, isSuccess, isPending, isError, isLoading, error } = useQuery({
    queryKey: [API_ROUTE.dispute.getAllDisputeByFreelancer, params],
    queryFn: async () =>
      await api.get(
        `${API_ROUTE.dispute.getAllDisputeByFreelancer}/${
          freelancer.id
        }?${constructQueryString(params)}`
      ),
    // enabled: id !== undefined && id !== null,
    // refetchOnWindowFocus: true,
    // staleTime: 0,
    // refetchOnMount: true,
  });
  return {
    data: data?.data?.data,
    totalPages: data?.data?.totalPages,
    isSuccess,
    isPending,
    isError,
    isLoading,
    error,
  };
}

export function useGetDisputeById(id) {
  const { data, isSuccess, isPending, isError, isLoading, error } = useQuery({
    queryKey: [API_ROUTE.dispute.getDisputeById, id],
    queryFn: async () =>
      await api.get(`${API_ROUTE.dispute.getDisputeById}/${id}`),
    // enabled: id !== undefined && id !== null,
    // refetchOnWindowFocus: true,
    // staleTime: 0,
    // refetchOnMount: true,
  });
  return {
    data: data?.data?.data,
    userResponseData: data?.data?.responseData,
    isSuccess,
    isPending,
    isError,
    error,
    isLoading,
  };
}

export function useGetAllDisputeByAdmin(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const queryKey = [API_ROUTE.dispute.getAllDisputeByAdmin, params];
  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(
        `${API_ROUTE.dispute.getAllDisputeByAdmin}?${constructQueryString(
          params
        )}`
      ),
  });
  return { data: data?.data?.data, error, isLoading, isError };
}

export function useGetDisputeAdminById(id) {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.dispute.getDisputeAdminById, id],
    queryFn: async () =>
      await api.get(`${API_ROUTE.dispute.getDisputeAdminById}/${id}`),
    // enabled: id !== undefined && id !== null,
    // refetchOnWindowFocus: true,
    // staleTime: 0,
    // refetchOnMount: true,
  });
  return {
    data: data?.data?.data,
    responseData: data?.data?.responseData,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}
