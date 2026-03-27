import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppSelector } from "@/hooks/use-apply-project";
import { CheckCircle2, XCircle } from 'lucide-react-native';
import { SafeAreaView } from "react-native-safe-area-context";

function OrderDetail() {

  const [quantity, setQuantity] = useState(1);
  const order = useAppSelector(state => state.order.order)
  const MIN_QTY = 1;
  const MAX_QTY = 10;

  if(Object.keys(order).length ===0) return <Text>No order found...</Text>

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Package Card */}
        <View style={styles.card}>
          <View style={styles.packageHeader}>
            <View style={styles.dot} />
            <Text style={styles.packageTitle}>{order.packageType}</Text>
            <Text style={styles.price}>${order.price}</Text>
          </View>

          <Text style={styles.description}>
            {order.packageDescription}
          </Text>
        </View>

        {/* Order Frequency */}
        <Text style={styles.sectionTitle}>ORDER FREQUENCY</Text>

        <View style={styles.card}>
          <View style={styles.frequencyRow}>
            <View style={styles.checkCircle}>
              <Feather name="check" size={16} color="#fff" />
            </View>
            <Text style={styles.frequencyText}>Single Order</Text>
            <Text style={styles.price}>${order.price}</Text>
          </View>
        </View>

        {/* Quantity */}
        <View style={styles.quantityHeader}>
          <Text style={styles.sectionTitle}>QUANTITY</Text>

          <View style={styles.quantityRow}>
            <TouchableOpacity
              style={[
                styles.qtyBtn,
                quantity === MIN_QTY && styles.disabledBtn,
              ]}
              disabled={quantity === MIN_QTY}
              onPress={() => setQuantity(quantity - 1)}
            >
              <Text style={styles.qtyText}>−</Text>
            </TouchableOpacity>

            <View style={styles.qtyValueBox}>
              <Text style={styles.quantity}>{quantity}</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.qtyBtn,
                quantity === MAX_QTY && styles.disabledBtn,
              ]}
              disabled={quantity === MAX_QTY}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>


        {/* Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <MaterialIcons name="inventory-2" size={22} color="#3C9D8D" />
            <Text style={styles.summaryText}>{order.packageType} Package</Text>
          </View>

          <View style={styles.summaryRow}>
            <Feather name="clock" size={22} color="#3C9D8D" />
            <Text style={styles.summaryText}>{order.deliveryTime} Days Delivery</Text>
          </View>

          {/* <View style={styles.summaryRow}>
            <Feather name="rotate-ccw" size={22} color="#3C9D8D" />
            <Text style={styles.summaryText}>3 Revisions</Text>
          </View> */}
        </View>

        <View style={styles.featureContainer}>
          {Object.entries(JSON.parse(order.packages)).map(([key, value], index) => (
            <View key={index} style={[styles.summaryRow, { paddingLeft: 10 }]}>
              {value ?
                <CheckCircle2 size={25} color="#147D7E" fill="#E8F2F2" />
                :
                <XCircle size={25} color="#B0B0B0" />
              }
              <Text style={styles.summaryText}>{key.replaceAll("_", " ")}</Text>
            </View>
          ))}
        </View>

        {/* Price */}
        <View style={styles.priceRow}>
          <Text style={styles.subtotal}>
            Subtotal ({quantity} × ${Number(order.price)})
          </Text>
          <Text style={styles.subtotal}>${quantity * Number(order.price)}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Price</Text>
          <Text style={styles.totalPrice}>${quantity * Number(order.price)}</Text>
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continue to Payment</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

export default OrderDetail;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F4F4F4'
  },

  container: {
    padding: 20,
  },

  card: {
    backgroundColor: "#F7FCFB",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#9AD1C7",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  packageHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3C9D8D",
    marginRight: 10,
  },

  packageTitle: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
    color: "#0F172A",
    textTransform: 'capitalize'
  },

  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#3C9D8D",
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#475569",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#0F172A",
  },

  frequencyRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#3C9D8D",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  frequencyText: {
    flex: 1,
    fontSize: 16,
    color: "#0F172A",
  },

  quantityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
  },


  qtyBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
  },

  disabledBtn: {
    opacity: 0.4,
  },

  qtyValueBox: {
    minWidth: 60,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  qtyText: {
    fontSize: 22,
    fontWeight: "600",
  },

  quantity: {
    fontSize: 18,
    fontWeight: "600",
  },

  summaryCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },

  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  featureContainer: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
    paddingTop: 10
  },

  summaryText: {
    marginLeft: 12,
    fontSize: 15,
    color: "#334155",
    textTransform: "capitalize"
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  subtotal: {
    fontSize: 15,
    color: "#334155",
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 10,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: "700",
  },

  totalPrice: {
    fontSize: 22,
    fontWeight: "700",
    color: "#3C9D8D",
  },

  button: {
    backgroundColor: "#3C9D8D",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
