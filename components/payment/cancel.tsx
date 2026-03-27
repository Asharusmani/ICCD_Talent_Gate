import { View, Text, StyleSheet, Alert } from "react-native";
import { useEffect } from "react";

export default function PaymentCancel() {
  useEffect(() => {
    Alert.alert("Payment Cancelled", "You did not complete the payment.");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>❌ Payment Cancelled</Text>
      <Text style={styles.subtitle}>
        Your payment was not completed. Please try again if you want.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff5f5",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ef4444", // red
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
});
