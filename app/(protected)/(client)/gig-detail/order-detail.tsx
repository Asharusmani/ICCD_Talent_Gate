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
import { CheckCircle2, XCircle, Package, Clock, ShoppingCart } from 'lucide-react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const ACCENT = '#0d9488';
const BORDER = 'rgba(14,165,233,0.18)';
const TEXT_PRIMARY = '#0f172a';
const TEXT_SECONDARY = '#6b7280';

function OrderDetail() {
  const [quantity, setQuantity] = useState(1);
  const order = useAppSelector(state => state.order.order);
  const MIN_QTY = 1;
  const MAX_QTY = 10;

  if (Object.keys(order).length === 0) return <Text>No order found...</Text>;

  return (
    <LinearGradient
      colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.6, y: 1 }}
    >
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >

          {/* Package Card */}
          <View style={styles.card}>
            <View style={styles.packageHeader}>
              <View style={styles.packageTitleRow}>
                <View style={styles.dot} />
                <Text style={styles.packageTitle}>{order.packageType} Package</Text>
              </View>
              <View style={styles.priceBadge}>
                <Text style={styles.priceCurrency}>$</Text>
                <Text style={styles.price}>{order.price}</Text>
              </View>
            </View>
            <Text style={styles.description}>{order.packageDescription}</Text>
          </View>

          {/* Order Frequency */}
          <Text style={styles.sectionTitle}>Order Frequency</Text>
          <View style={styles.card}>
            <View style={styles.frequencyRow}>
              <View style={styles.checkCircle}>
                <Feather name="check" size={14} color="#fff" />
              </View>
              <Text style={styles.frequencyText}>Single Order</Text>
              <Text style={styles.frequencyPrice}>${order.price}</Text>
            </View>
          </View>

          {/* Quantity */}
          <View style={styles.quantityHeader}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantityRow}>
              <TouchableOpacity
                style={[styles.qtyBtn, quantity === MIN_QTY && styles.disabledBtn]}
                disabled={quantity === MIN_QTY}
                onPress={() => setQuantity(quantity - 1)}
              >
                <Text style={styles.qtyText}>−</Text>
              </TouchableOpacity>
              <View style={styles.qtyValueBox}>
                <Text style={styles.quantity}>{quantity}</Text>
              </View>
              <TouchableOpacity
                style={[styles.qtyBtn, quantity === MAX_QTY && styles.disabledBtn]}
                disabled={quantity === MAX_QTY}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Summary */}
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.card}>
            <View style={styles.summaryRow}>
              <View style={styles.summaryIconBox}>
                <Package size={16} color={ACCENT} />
              </View>
              <Text style={styles.summaryText}>{order.packageType} Package</Text>
            </View>
            <View style={[styles.summaryRow, { marginBottom: 0 }]}>
              <View style={styles.summaryIconBox}>
                <Clock size={16} color={ACCENT} />
              </View>
              <Text style={styles.summaryText}>{order.deliveryTime} Days Delivery</Text>
            </View>
          </View>

          {/* Features */}
          <Text style={styles.sectionTitle}>What's Included</Text>
          <View style={styles.card}>
            {Object.entries(JSON.parse(order.packages)).map(([key, value], index) => (
              <View
                key={index}
                style={[
                  styles.featureRow,
                  index === Object.entries(JSON.parse(order.packages)).length - 1 && { marginBottom: 0 }
                ]}
              >
                {value
                  ? <CheckCircle2 size={18} color={ACCENT} fill="rgba(13,148,136,0.12)" />
                  : <XCircle size={18} color="#d1d5db" />
                }
                <Text style={[styles.featureText, !value && styles.featureTextDisabled]}>
                  {key.replaceAll('_', ' ')}
                </Text>
              </View>
            ))}
          </View>

          {/* Price Breakdown */}
          <View style={styles.priceCard}>
            <View style={styles.priceRow}>
              <Text style={styles.subtotalLabel}>Subtotal ({quantity} × ${Number(order.price)})</Text>
              <Text style={styles.subtotalValue}>${quantity * Number(order.price)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalPrice}>${quantity * Number(order.price)}</Text>
            </View>
          </View>

          {/* Button */}
          <TouchableOpacity
            style={styles.primaryBtnWrapper}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={[ACCENT, '#0891b2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.primaryBtn}
            >
              <ShoppingCart size={20} color="#fff" />
              <Text style={styles.buttonText}>Continue to Payment</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={{ height: 20 }} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default OrderDetail;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safe: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    padding: 16,
    paddingTop: 8,
  },

  // Card
  card: {
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: BORDER,
  },

  // Package
  packageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  packageTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: ACCENT,
    marginRight: 10,
  },
  packageTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    textTransform: 'capitalize',
  },
  priceBadge: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(13,148,136,0.10)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(13,148,136,0.20)',
  },
  priceCurrency: {
    fontSize: 11,
    fontWeight: '700',
    color: ACCENT,
    marginTop: 3,
  },
  price: {
    fontSize: 20,
    fontWeight: '800',
    color: ACCENT,
  },
  description: {
    fontSize: 13,
    lineHeight: 20,
    color: TEXT_SECONDARY,
  },

  // Section title
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: TEXT_SECONDARY,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },

  // Frequency
  frequencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: ACCENT,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  frequencyText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: TEXT_PRIMARY,
  },
  frequencyPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: ACCENT,
  },

  // Quantity
  quantityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.82)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDER,
  },
  disabledBtn: {
    opacity: 0.4,
  },
  qtyValueBox: {
    minWidth: 52,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: BORDER,
  },
  qtyText: {
    fontSize: 20,
    fontWeight: '600',
    color: TEXT_PRIMARY,
  },
  quantity: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_PRIMARY,
  },

  // Summary
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  summaryIconBox: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: 'rgba(13,148,136,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryText: {
    fontSize: 14,
    color: TEXT_PRIMARY,
    fontWeight: '500',
    textTransform: 'capitalize',
  },

  // Features
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 11,
  },
  featureText: {
    fontSize: 14,
    color: TEXT_PRIMARY,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  featureTextDisabled: {
    color: '#d1d5db',
  },

  // Price breakdown
  priceCard: {
    backgroundColor: 'rgba(255,255,255,0.82)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: BORDER,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  subtotalLabel: {
    fontSize: 13,
    color: TEXT_SECONDARY,
  },
  subtotalValue: {
    fontSize: 13,
    color: TEXT_SECONDARY,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: BORDER,
    marginBottom: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: TEXT_PRIMARY,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: '800',
    color: ACCENT,
  },

  // Button
  primaryBtnWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryBtn: {
    flexDirection: 'row',
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});