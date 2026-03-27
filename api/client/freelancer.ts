import { useAuth } from "@/utils/auth-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../axios";
import API_ROUTE from "../endPoints";
import { setProfile } from "@/store/slices/freelancer-profile";
import { useAppDispatch } from "@/hooks/use-apply-project";
import { router } from "expo-router";


export function useCheckFreelancer() {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.freelancer.checkIsFreelancer],
    queryFn: async () =>
      await api.get(`${API_ROUTE.freelancer.checkIsFreelancer}`),
    staleTime: 1 * 24 * 60 * 60,
    refetchOnWindowFocus: false,
  });
  return {
    data: data?.data?.data,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useGetFreelDashboardData() {
  const { freelancer } = useAuth();
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.freelancer.getFreelancerDashboardData],
    queryFn: async () =>
      await api.get(
        `${API_ROUTE.freelancer.getFreelancerDashboardData}?freelancerId=${freelancer.id}`
      ),
  });
  return {
    data: data?.data?.data,
    isSuccess,
    isPending,
    isError,
    isLoading,
  };
}

export function useGetFreelancerProfile() {
  const { data, isSuccess, isPending, isError, isLoading } = useQuery({
    queryKey: [API_ROUTE.freelancer.getFreelancerProfile],
    queryFn: async () =>
      await api.get(`${API_ROUTE.freelancer.getFreelancerProfile}`),
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

export function useAddProfile() {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch()
  const { addFreelancer } = useAuth()
  const {
    mutate: addProfile,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.post(`${API_ROUTE.freelancer.addProfile}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: api.defaults.headers.common["Authorization"],
        },
        timeout: 30000,
      }),
    onSuccess: (data, res) => {
      alert("Profile added successfully!");
      addFreelancer(data?.data?.freelancer || null)
      router.push("/(protected)/(isFreelancerProfile)/(freelancer)/(tabs)");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.freelancer.getFreelancerProfile],
      });
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.freelancer.checkIsFreelancer],
      });
    },
    onError: (error) => {
      // Toast.show({
      //     type: "error",
      //     text1: "Error",
      //     text2: "Failed to edit scout",
      // });
      alert("Profile Not Added Error!");
    },
  });
  return { addProfile, isSuccess, isPending, isError, error };
}

export function useEditProfile(freelancerId) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const {
    mutate: editProfile,
    isSuccess,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (data) =>
      await api.put(
        `${API_ROUTE.freelancer.editProfile}/${freelancerId}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: api.defaults.headers.common["Authorization"],
          },
          timeout: 30000,
        }
      ),
    onSuccess: (data, res) => {
      toast.success("Profile edit successfully!");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTE.freelancer.getFreelancerProfile],
      });
    },
    onError: (error) => {
      toast.error("failed");
      // Toast.show({
      //     type: "error",
      //     text1: "Error",
      //     text2: "Failed to edit scout",
      // });
    },
  });
  return { editProfile, isSuccess, isPending, isError, error };
}
