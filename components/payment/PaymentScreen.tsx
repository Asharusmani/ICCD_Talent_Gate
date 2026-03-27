import React from "react";
import { View, Button, Alert } from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { createPaymentIntent } from "@/api/client/stripe";
import { useRouter } from 'expo-router';

export default function PaymentScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const router = useRouter();

  const pay = async () => {
    try {
      const { clientSecret } = await createPaymentIntent(1000);
      if (!clientSecret) {
        Alert.alert("Error", "Client secret missing");
        return;
      }
      const init = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Mohid App",
        allowsDelayedPaymentMethods: true,
      });

      if (init.error) {
        Alert.alert("Stripe Error", init.error.message);
        return;
      }
      const payment = await presentPaymentSheet();
      if (payment.error) {
        router.push("/(protected)/(payment)/cancel");
        return;
      }
      router.push("/(protected)/(payment)/success");
    } catch (err: any) {
      console.log("Stripe Error:", err);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Pay $10" onPress={pay} />
    </View>
  );
}
