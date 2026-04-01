import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export default function PackageDetails({ name, price, features = [] }: any) {
  //   const features = [
  //   'React Web App',
  //   'React Web App',
  //   'React Web App',
  // ]
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Package Details</Text>
        <Text style={styles.sub}>Everything included in your order</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.label}>Package Name</Text>
          <Text style={styles.value}>{name}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Package Price</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.heading}>Included Features</Text>

        <View style={styles.grid}>
          {features.map((item: string, index: number) => (
            <View key={index} style={styles.featureBox}>
              <Ionicons name="checkmark-circle-outline" size={16} color="#0d9488" />
              <Text style={styles.featureText}>{item.replaceAll("_", " ")}</Text>
            </View>
          ))}
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0d9488',
    padding: 18,
    borderRadius: 15,
    marginTop: 4,
    marginBottom: 22,
  },
  title: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  sub: {
    color: 'rgba(255,255,255,0.80)',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.80)',
    padding: 30,
    paddingRight: 0,
    borderRadius: 12,
    paddingLeft: 15,
    borderWidth: 1,
    borderColor: 'rgba(14,165,233,0.15)',
  },
  label: {
    fontSize: 15,
    color: '#0f172a',
    fontWeight: '500',
  },
  value: {
    fontSize: 12,
    marginTop: 6,
    color: 'rgba(15,23,42,0.55)',
  },
  price: {
    fontSize: 15,
    color: '#0d9488',
    fontWeight: '600',
    marginTop: 6,
  },
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#0f172a',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureBox: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13,148,136,0.08)',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 20,
    marginBottom: 10,
  },
  featureText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#0d9488',
  },
});