import React, { createContext, useContext, useState, PropsWithChildren } from 'react';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

const AuthContext = createContext<any | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {

  const [user, setUser] = useState<string | null>(null);
  const [freelancer, setFreelancer] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (accessToken: string, user: string, freelancer: string) => {
    await SecureStore.setItemAsync('token', accessToken);
    await SecureStore.setItemAsync('user', user);
    await SecureStore.setItemAsync('freelancer', freelancer);
    setToken(accessToken);
    setUser(JSON.parse(user));
    setFreelancer(freelancer ? JSON.parse(freelancer) : null);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('user');
    await SecureStore.deleteItemAsync('freelancer');
    setToken(null);
    setUser(null);
    setFreelancer(null)
    router.replace("/login")
  };

  const addFreelancer = (data: any) => {
    setFreelancer(data)
  }

  return (
    <AuthContext.Provider value={{ user, freelancer, token, login, logout, addFreelancer, isAuthenticated: !!token || false}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
