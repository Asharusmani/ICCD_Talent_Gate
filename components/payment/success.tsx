import { View, Text, StyleSheet } from "react-native";

export default function PaymentSuccess() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Payment Successful!</Text>
      <Text style={styles.subtitle}>
        Thank you for your purchase. Your payment has been completed.
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
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#22c55e", // green
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
});
