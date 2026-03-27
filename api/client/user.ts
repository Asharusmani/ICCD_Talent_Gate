import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { useAuth } from "../../utils/auth-context";
import api from "../axios/index";
import API_ROUTE from "../endPoints";

export function useLogin() {
  const { login } = useAuth();
  const {
    mutate: userLogin,
    isSuccess,
    isPending,
    isError,
    reset,
    error,
    data,
  } = useMutation({
    mutationFn: (data) => api.post(API_ROUTE.user.login, data),
    onSuccess: async (response) => {
      await login(response?.data?.token, JSON.stringify(response?.data?.data), JSON.stringify(response?.data?.freelancer));
      router.push("/(protected)/(client)/(tabs)");
    },
    onError: (err) => {
      console.log("err: ", err?.message);
    },
  });

  return {
    userLogin,
    isSuccess,
    isPending,
    isError,
    reset,
    error: error?.message || error?.response?.data?.message,
    data,
  };
}

export function useSignUp(options = {}) {
  const {
    mutate: userSignUp,
    isSuccess,
    isPending,
    isError,
    reset,
    error,
    data,
  } = useMutation({
    mutationFn: (data) => api.post(API_ROUTE.user.signUp, data),
    ...options,
  });

  return {
    userSignUp,
    isSuccess,
    isPending,
    isError,
    reset,
    error: error?.response?.data?.message,
    data,
  };
}

export function useSendOtp(options = {}) {

  const {
    mutate: handleEmail,
    isSuccess,
    isPending,
    isError,
    reset,
    error,
    data,
  } = useMutation({
    mutationFn: (data) => api.post(API_ROUTE.user.sendOtp, data),
    ...options,
  });

  return {
    handleEmail,
    isSuccess,
    isPending,
    isError,
    reset,
    error: error?.response?.data?.message,
    data,
  };
}

export function useSubmitOtp(options = {}) {

  const {
    mutate: handleOtp,
    isSuccess,
    isPending,
    isError,
    reset,
    error,
    data,
  } = useMutation({
    mutationFn: (data) => api.post(API_ROUTE.user.submitOtp, data),
    ...options,
  });

  return {
    handleOtp,
    isSuccess,
    isPending,
    isError,
    reset,
    error: error?.response?.data?.message,
    data,
  };
}

export function useChangePassword(options = {}) {

  const {
    mutate: change_pass,
    isSuccess,
    isPending,
    isError,
    reset,
    error,
    data,
  } = useMutation({
    mutationFn: (data) => api.put(API_ROUTE.user.changePasword, data),
    ...options,
  });

  return {
    change_pass,
    isSuccess,
    isPending,
    isError,
    reset,
    error: error?.response?.data?.message,
    data,
  };
}
