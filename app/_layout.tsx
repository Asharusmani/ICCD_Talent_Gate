import { store } from "@/store";
import "react-native-reanimated";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/utils/auth-context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { StripeProvider } from "@stripe/stripe-react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [queryClient] = useState(() => new QueryClient());

  return (

    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {/* <StripeProvider
            publishableKey="pk_test_51QCl1eCDh3RtIJ6XkYcN5vHd3KTO2f8enRSNv9Wx7Li0iCI7cr9khTDQx0vS5RmbazZoaECNW83FesOMwLeIgMLb00BJG4pPZR"
            merchantIdentifier="merchant.com.yourapp"
          > */}
            <Stack>
              <Stack.Screen
                name="(protected)"
                options={{ headerShown: false }}
              />
            </Stack>
          {/* </StripeProvider> */}
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}
