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
        backgroundColor="rgba(255,255,255,0.80)"
        color="#0d9488"
      />

      <InfoCard
        icon="cash-outline"
        title="Total Price"
        value={`$${price}`}
        backgroundColor="rgba(255,255,255,0.80)"
        color="#0891b2"
      />

      <InfoCard
        icon="refresh-outline"
        title="Revisions"
        value={revisions}
        backgroundColor="rgba(255,255,255,0.80)"
        color="#7dd3fc"
      />

      <InfoCard
        icon="calendar-outline"
        title="Delivery Days"
        value={`${deliveryDays} days`}
        backgroundColor="rgba(255,255,255,0.80)"
        color="#0d9488"
      />

    </View>
  );
}