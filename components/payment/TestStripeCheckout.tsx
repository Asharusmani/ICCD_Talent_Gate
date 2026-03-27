// frontend/app/(protected)/(payment)/TestStripeCheckout.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PaymentScreen from "@/components/payment/PaymentScreen";
import { linearGradientStart } from "@/constants/colors";

export default function TestStripeCheckout() {
  return (
    <LinearGradient
      colors={linearGradientStart}
      style={styles.container}
    >
      <PaymentScreen />
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    paddingHorizontal: 20,
  },
});
