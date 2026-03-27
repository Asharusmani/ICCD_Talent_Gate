// import { toast } from "react-toastify";
import api from "../axios";
import API_ROUTE from "../endPoints";
import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useAppDispatch } from "@/hooks/use-apply-project";
import { reset } from "@/store/slices/apply-project-slice";

export function useAddproject() {
  const queryClient = useQueryClient()
  const { mutate: addProject, isSuccess, isPending, isError, error } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.project.addProject}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.project.getProjectByClient],
      });
      alert("Project added successfully!")
      router.push('/(protected)/(client)/posted-project')
    },
    onError: (error) => {
      alert("Error in Adding Project added !")
    },
  });
  return { addProject, isSuccess, isPending, isError, error };
}

// get project by user
export function useGetProjectsByClient(params = {}) {
  
  const queryClient = useQueryClient();

  const constructQueryString = (params: any) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const queryKey = [API_ROUTE.project.getProjectByClient, params];
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
        `${API_ROUTE.project.getProjectByClient}?page=${pageParam}${constructQueryString(
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

// export function useGetProjectsByClient(params = {}) {
//   const constructQueryString = (params) => {
//     const query = new URLSearchParams(params).toString();
//     return query ? `&${query}` : "";
//   };
//   const { data, isSuccess, isPending, isError, isLoading } = useQuery({
//     queryKey: [API_ROUTE.project.getProjectByClient, params],
//     queryFn: async () => await api.get(`${API_ROUTE.project.getProjectByClient}?${constructQueryString(params)}`),
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

// get project by user
export function useGetAllProjects(params = {}) {
  const constructQueryString = (params) => {
    const query = new URLSearchParams(params).toString();
    return query ? `&${query}` : "";
  };
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.project.getAllProject, params],
    queryFn: async () => await api.get(`${API_ROUTE.project.getAllProject}?${constructQueryString(params)}`),
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

export function useGetProjectsById(id) {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.project.getProjectById, id],
    queryFn: async () => await api.get(`${API_ROUTE.project.getProjectById}/${id}`),
    enabled: id !== undefined && id !== null
  });
  return {
    data: data?.data?.data,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useApplyProject() {
  const dispatch = useAppDispatch()
  const { mutate: submitProposals, isSuccess, isPending, isError, error } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.project.submitProposals}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      alert("Proposal submitted successfully!")
      dispatch(reset())
      router.replace('/(protected)/(isFreelancerProfile)/(freelancer)/project')
    },
    onError: (error) => {
      console.log("error: ", error)
      alert("error in sending cv !")
    },
  });
  return { submitProposals, isSuccess, isPending, isError, error };
}

export function useGetProjectProposalByClient(id) {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.project.getProjectPropsalByClient, id],
    queryFn: async () => await api.get(`${API_ROUTE.project.getProjectPropsalByClient}/${id}`),
  });
  return {
    data: data?.data?.data,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useEditProjects(id) {
  const navigate = useNavigate()
  const {
    mutate: editProject,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.put(`${API_ROUTE.project.editProject}/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data) => {
      toast.success("Project Edit Successfully")
      navigate('/client/projects')

    },
    onError: (error) => {
      // Toast.show({
      //     type: "error",
      //     text1: "Error",
      //     text2: "Failed to edit scout",
      // });
      toast.error("error in Editing project ")

    },
  });
  return { editProject, isSuccess, isPending, isError, error };
}

export function useProjectProposalAction() {
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
      return await api.put(`${API_ROUTE.project.projectProposalAction}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.project.getProjectPropsalByClient],
      });
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.project.getProjectShortListCandidate],
      });
      toast.success("Project Proposal Updated Successfully");
    },
    onError: (message) => {
      toast.error(message?.response?.data?.message);
    },
  });

  return { updateProposalAction, mutateAsync, isSuccess, isPending, isError, error };
}

export function useGetProjectShortlistProposals(id) {

  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.project.getProjectShortListCandidate, id],
    queryFn: async () => await api.get(`${API_ROUTE.project.getProjectShortListCandidate}/${id}`),
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


