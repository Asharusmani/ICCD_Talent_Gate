import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  // live database
  // baseURL: "https://iccd.freelanceserver.matzsolutions.com/",
  // baseURL: "http://192.168.100.8:22306/",

  // Sohaib Phone
  baseURL: "http://192.168.100.105:22306/",
  // baseURL: "http://192.168.100.8:22306/",

  // Mohid Phone
  // baseURL: "http://192.168.100.7:22306/",
  
  
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // optional timeout
});

// Optional: Add interceptors for auth, logging, errors
api.interceptors.request.use(
  async (config) => {
    // For example, attach auth token here
    const token = await SecureStore.getItemAsync("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.log("err1: ", error);
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      if (error?.response?.data?.message === 'Token expired') {
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('user');
        await SecureStore.deleteItemAsync('freelancer');
        router.replace("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
