import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSegments, router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { formatDate } from '@/functions/date-format';

export const DisputeCard = ({ item }: any) => {

  const segmants = useSegments()
  const route = segmants.includes('(client)') ? `/client-dispute-list/${item.id}}`: `/freelancer-dispute-list/${item.id}}`

  return (
    <View style={styles.card}>
      {/* Header Section */}
      <View style={styles.headerRow}>
        <Text style={styles.orderNumber}>Order Number : {item.orderNumber}</Text>
        <View style={styles.pendingBadge}>
          <MaterialCommunityIcons name="history" size={20} color="#059669" />
          <Text style={styles.pendingText}>{item.status}</Text>
        </View>
      </View>

      {/* Counterpart Section */}
      <View style={styles.sectionMargin}>
        <Text style={styles.labelSmall}>Counterpart</Text>
        <Text style={styles.counterpartName}>{item.name}</Text>
      </View>

      {/* Description Section */}
      <View style={styles.sectionMargin}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionBody}>{item.reason}</Text>
      </View>

      {/* Footer Section */}
      <View style={styles.footerRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push(route)}
        >
          <LinearGradient
            colors={['#15A9B2', '#115B60']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.viewButton}
          >
            <Text style={styles.viewButtonText}>View Details</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.dateContainer}>
          <Text style={styles.labelSmall}>Created at:</Text>
          <Text style={styles.dateText}>{formatDate(item?.created_at)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: '#0D3B4C',
  },
  pendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 70,
  },
  pendingText: {
    fontSize: 14,
    color: '#059669',
    marginLeft: 5,
    fontWeight: '600',
    textTransform: "capitalize"
  },
  sectionMargin: {
    marginBottom: 15,
  },
  labelSmall: {
    fontSize: 14,
    color: '#0D3B4C',
    opacity: 0.8,
    fontWeight: '700',
  },
  counterpartName: {
    fontSize: 16,
    color: 'black',
    marginTop: 2,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    marginBottom: 5,
  },
  descriptionBody: {
    fontSize: 14,
    color: 'black',
    lineHeight: 20,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 5,
  },
  viewButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  dateContainer: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0D3B4C',
  },
});