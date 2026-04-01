import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OrderDetailHeader({ orderNo, status }: any) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <View style={styles.topHeader}>
          <Ionicons name="chevron-back" size={22} color="#0d9488" />
        </View>
      </TouchableOpacity>

      <View>
        <Text style={styles.title}>Order Details</Text>
        <Text style={styles.sub}>{`Order ${orderNo}`}</Text>
      </View>

      <View style={styles.badge}>
        <Ionicons name="checkmark" size={14} color="#fff" />
        <Text style={styles.badgeText}>{status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    paddingRight: 80,
    color: '#0f172a',
  },
  sub: {
    fontSize: 12,
    color: '#6B7280',
  },
  badge: {
    flexDirection: 'row',
    backgroundColor: '#0d9488',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    marginLeft: 4,
  },
  topHeader: {
    height: 38,
    width: 38,
    padding: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.75)',
    borderWidth: 1,
    borderColor: 'rgba(14,165,233,0.20)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});