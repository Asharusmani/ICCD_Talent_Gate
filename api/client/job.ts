import api from "../axios";
import API_ROUTE from "../endPoints";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { JobFormProps } from '@/components/types/proposal.types';
import { useInfiniteQuery } from "@tanstack/react-query";

// import { toast } from 'react-toastify';


export function useGetAllJobs(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.job.getAllJob, params],
    queryFn: async () => await api.get(`${API_ROUTE.job.getAllJob}?${constructQueryString(params)}`),
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
  };
}

export function useGetJobById(id) {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.job.getJobById, id],
    queryFn: async () => await api.get(`${API_ROUTE.job.getJobById}/${id}`),
    enabled: id !== undefined && id !== null
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

export function useGetJobShortlistCandidate(id) {

  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.job.getJobShortListCandidate, id],
    queryFn: async () => await api.get(`${API_ROUTE.job.getJobShortListCandidate}/${id}`),
    enabled: id !== undefined && id !== null 
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


export function useAddJob() {
  const queryClient = useQueryClient()
  const { mutate: addjob, isSuccess, isPending, isError, error } = useMutation({
    mutationFn: async (data: JobFormProps) =>
      await api.post(`${API_ROUTE.job.addJob}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.job.getJobsByClient],
      });
      alert("Job Added successfully!")
      router.push('/posted-job')
    },
    onError: (error) => {
      // Toast.show({
      //     type: "error",
      //     text1: "Error",
      //     text2: "Failed to edit scout",
      // });
      alert("Error In Addding Job Added !")
      console.log("error: ", error)

    },
  });
  return { addjob, isSuccess, isPending, isError, error };
}
// get project
export function useGetJob(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const queryKey = [API_ROUTE.job.getJob, params];
  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(`${API_ROUTE.job.getJob}?${constructQueryString(params)}`),
  });
  return { jobs: data?.data?.data, error, isLoading, isError };
}

// export function useGetAllJobByClient(params = {}) {
//   const constructQueryString = (params) => {
//     const query = new URLSearchParams(params).toString();
//     return query ? `&${query}` : "";
//   };
//   const { data, isSuccess, isPending, isError, isLoading } = useQuery({
//     queryKey: [API_ROUTE.job.getJobsByClient, params],
//     queryFn: async () => await api.get(`${API_ROUTE.job.getJobsByClient}?${constructQueryString(params)}`),
//   });
//   return {
//     data: data?.data?.data,
//     totalPages: data?.data?.totalPages,
//     isSuccess,
//     isPending,
//     isError,
//     isLoading,
//   };
// }

export function useGetAllJobByClient(params = {}) {
  const queryClient = useQueryClient();

  const constructQueryString = (params: any) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const queryKey = [API_ROUTE.job.getJobsByClient, params];
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
        `${API_ROUTE.job.getJobsByClient}?page=${pageParam}${constructQueryString(
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

export function getJobPropsalByClient(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const queryKey = [API_ROUTE.job.getJobPropsalByClient, params];
  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () =>
      api.get(`${API_ROUTE.job.getJobPropsalByClient}?${constructQueryString(params)}`),
  });
  return { jobProposals: data?.data?.data, error, isLoading, isError };
}


export function useEditJobs(id) {
  // const pathname = usePathname();
  const queryClient = useQueryClient();
  // const { dispatch } = useGlobalState();

  const {
    mutate: editJob,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.put(`${API_ROUTE.job.editJob}/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.job.getJobsByClient],
      });
      alert("Job Edit Successfully")
    },
    onError: (error) => {
      // Toast.show({
      //     type: "error",
      //     text1: "Error",
      //     text2: "Failed to edit scout",
      // });
      alert("Error in Editing Job ! ")

    },
  });
  return { editJob, isSuccess, isPending, isError, error };
}

export function useApplyJob() {

  const { mutate: submitJob, isSuccess, isPending, isError, error } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.job.applyjob}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      alert("Job applied successfully")

    },
    onError: (error) => {
      // alert.error("Failed to applied job")
      console.log("err: ", error.message)
    },
  });
  return { submitJob, isSuccess, isPending, isError, error };
}


// export function useJobCloseById(id) {
//   const { data, isSuccess, isPending, isError, isLoading } = useQuery({
//     queryKey: [API_ROUTE.job.closejob, id],
//     queryFn: async () => await api.put(`${API_ROUTE.job.closejob}/${id}`),
//     enabled: id !== undefined && id !== null
//   });
//   return {
//     data: data?.data?.data,
//     isSuccess,
//     isPending,
//     isError,
//     isLoading,
//   };
// }

export function useJobCloseById(id) {
  const queryClient = useQueryClient();
  const {
    mutate: closejob,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.put(`${API_ROUTE.job.closejob}/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
      });
      toast.success("Job Close Successfully")
    },
    onError: (error) => {
      toast.error("Error in Closing Job ! ")

    },
  });
  return { closejob, isSuccess, isPending, isError, error };
}


export function useJobProposalAction() {
  const queryClient = useQueryClient();

  const {
    mutate: updateProposalAction,
    mutateAsync,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) => {
      return await api.put(`${API_ROUTE.job.jobProposalAction}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.job.getJobById],
      });
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.job.getJobPropsalByClient],
      });
      toast.success("Job Proposal Updated Successfully");
    },
    onError: (message) => {
      toast.error(message?.response?.data?.message);
    },
  });

  return { updateProposalAction, mutateAsync, isSuccess, isPending, isError, error };
}


// export function useJobProposalAction() {
//   const mutation = useMutation({
//     mutationFn: async ({ id, name, email, action }) => {
//       const response = await api.put(`${API_ROUTE.job.jobProposalAction}`, {
//         id,
//         name,
//         email,
//         action,
//       });
//       return response.data;
//     },
//   });

//   return {
//     mutate: mutation.mutate,
//     mutateAsync: mutation.mutateAsync,
//     data: mutation.data,
//     isSuccess: mutation.isSuccess,
//     isPending: mutation.isPending,
//     isError: mutation.isError,
//     isLoading: mutation.isLoading,
//     error: mutation.error,
//   };
// }
