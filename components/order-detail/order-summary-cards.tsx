import { View } from 'react-native';
import InfoCard from './info-card';

export default function OrderSummaryCards({
  packageName,
  price,
  revisions,
  deliveryDays,
}: any) {
  return (
    <View>

      <InfoCard
        icon="cube-outline"
        title="Package"
        value={packageName}
        backgroundColor="#eaf3ff"
        color="#0f172a"
      />

      <InfoCard
        icon="logo-usd"
        title="Total Price"
        value={`$${price}`}
        backgroundColor="#eafff1"
        color="#22c55e"
      />

      <InfoCard
        icon="star-outline"
        title="Revisions"
        value={revisions}
        backgroundColor="#f5f1ff"
        color="#8b5cf6"
      />

      <InfoCard
        icon="calendar-outline"
        title="Delivery Days"
        value={deliveryDays}
        backgroundColor="#fff6d8"
        color="#eab308"
      />

    </View>
  );
}
