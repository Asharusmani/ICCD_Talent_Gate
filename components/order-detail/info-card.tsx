import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export default function InfoCard({ icon, title, value, backgroundColor ,color}) {
  return (
    <View style={[styles.card, { backgroundColor }]}>
      
      {/* Left Icon */}
      <Ionicons name={icon} size={18} color={color} />

      {/* Right Text */}
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: '',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  textWrapper: {
    marginLeft: 10,
  },
  title: {
    fontSize: 13,
    color: '#475569',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    marginTop: 2,
    // marginLeft: -25,
  },
});
