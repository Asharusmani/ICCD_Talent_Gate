import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

interface InfoCardProps {
  icon: string;
  title: string;
  value: string;
  backgroundColor: string;
  color: string;
}

export default function InfoCard({ icon, title, value, backgroundColor, color }: InfoCardProps) {
  return (
    <View style={[styles.card, { backgroundColor }]}>

      {/* Icon wrapper */}
      <View style={[styles.iconWrapper, { backgroundColor: color + '18' }]}>
        <Ionicons name={icon as any} size={18} color={color} />
      </View>

      {/* Right Text */}
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.value, { color }]}>{value}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(14,165,233,0.12)',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    marginLeft: 12,
  },
  title: {
    fontSize: 12,
    color: 'rgba(15,23,42,0.50)',
    fontWeight: '500',
  },
  value: {
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
});