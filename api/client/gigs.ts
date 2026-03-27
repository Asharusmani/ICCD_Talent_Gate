import api from "../axios/index";
import API_ROUTE from "../endPoints";
import { useAuth } from "@/utils/auth-context";
import { useAppDispatch } from "@/hooks/use-apply-project";
import { resetGig } from "@/store/slices/gig-detail-slice";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

export function useAddGigs() {
  // const pathname = usePathname();
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient();
  const {
    mutate: addGigs,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.gigs.addGigs}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.gigs.getGigsByUserId],
      });
      dispatch(resetGig())
      router.replace('/posted-gigs');
      // alert("Gigs added successfully!");
    },
    onError: (error) => {
      // Toast.show({
      //     type: "error",
      //     text1: "Error",
      //     text2: "Failed to edit scout",
      // });
      console.log("error: ", error)
      alert("error in adding gigs!");

    },
  });
  return { addGigs, isSuccess, isPending, isError, error };
}

// export function useGetGigs(params = {}) {
//   const constructQueryString = (params) => {
//     const query = new URLSearchParams(params).toString();
//     return query ? `&${query}` : "";
//   };
//   const queryKey = [API_ROUTE.gigs.getGigs, params];
//   const { data, error, isLoading, isError } = useQuery({
//     queryKey,
//     queryFn: () =>
//       api.get(`${API_ROUTE.gigs.getGigs}?${constructQueryString(params)}`),
//   });
//   return {
//     gigs: data?.data?.data,
//     totalPages: data?.data?.totalPages,
//     error,
//     isLoading,
//     isError,
//   };
// }

export function useGetGigs(params = {}) {
  const queryClient = useQueryClient();

  const constructQueryString = (params: any) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const queryKey = [API_ROUTE.gigs.getGigs, params];
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
        `${API_ROUTE.gigs.getGigs}?page=${pageParam}${constructQueryString(
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
    gigs: data?.pages?.flatMap((page) => page?.data?.data) ?? [],
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

export function useGetSingleGigs(id) {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.gigs.getSingleGigs, id],
    queryFn: async () => await api.get(`${API_ROUTE.gigs.getSingleGigs}/${id}`),
    enabled: id !== undefined && id !== null,
    // refetchOnWindowFocus: true,
    // staleTime: 0,
    // refetchOnMount: true,
  });
  return {
    data: data?.data?.data,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useGetGigsPackages(id) {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: [API_ROUTE.gigs.getGigsPackages, id],
    queryFn: () => api.get(`${API_ROUTE.gigs.getGigsPackages}/${id}`),
    enabled: Boolean(id),
  });
  return { gigsPackages: data?.data?.data, error, isLoading, isError };
}

export function useGetGigsOverview(id) {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.gigs.getGigsOverview, id],
    queryFn: async () =>
      await api.get(`${API_ROUTE.gigs.getGigsOverview}/${id}`),
    enabled: id !== undefined && id !== null,
    // refetchOnWindowFocus: true,
    // staleTime: 0,
    // refetchOnMount: true,
  });
  return {
    data: data?.data?.data,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useGetGigsByUser(params = {}) {

  const { freelancer } = useAuth();

  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };

  const { data, isSuccess, isPending, error, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.gigs.getGigsByUserId, params],
    queryFn: async () =>
      await api.get(`${API_ROUTE.gigs.getGigsByUserId}/${freelancer.id}?${constructQueryString(params)}`
      ),
  });
  return {
    data: data?.data?.data,
    totalPages: data?.data?.totalPages,
    isSuccess,
    isPending,
    isError,
    error,
    isLoading,
  };
}

export function useGetGigsFiles(id) {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.gigs.getGigsFiles, id],
    queryFn: async () => await api.get(`${API_ROUTE.gigs.getGigsFiles}/${id}`),
    enabled: id !== undefined && id !== null,
    // refetchOnWindowFocus: true,
    // staleTime: 0,
    // refetchOnMount: true,
  });
  return {
    data: data?.data?.data,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useEditGigs(id, formType = "json") {
  // const pathname = usePathname();
  const queryClient = useQueryClient();
  // const { dispatch } = useGlobalState();

  const {
    mutate: editGigs,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.put(`${API_ROUTE.gigs.editGigs}/${id}`, data, {
        headers: {
          "Content-Type":
            formType === "json" ? "application/json" : "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.gigs.editGigs],
      });

      // toast.success("Gigs edit successfully!");
    },
    onError: (error) => {
      // Toast.show({
      //     type: "error",
      //     text1: "Error",
      //     text2: "Failed to edit scout",
      // });
      toast.error("Erorr in editting Gigs!");
    },
  });
  return { editGigs, isSuccess, isPending, isError, error };
}

export function useEditGigsFiles(id) {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch()
  const {
    mutate: editGigsFiles,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.gigs.editGigsFiles}/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.gigs.getGigsByUserId],
      });
      dispatch(resetGig())
      router.replace('/posted-gigs');
      // alert("Gigs Files edit successfully!");
    },
    onError: (error) => {
      // Toast.show({
      //     type: "error",
      //     text1: "Error",
      //     text2: "Failed to edit scout",
      // });
      alert("error in editing Gigs Files !");
    },
  });
  return { editGigsFiles, isSuccess, isPending, isError, error };
}
