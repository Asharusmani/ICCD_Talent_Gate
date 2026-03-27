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
              <Ionicons name="checkmark-circle-outline" size={16} color="#22c55e" />
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
    backgroundColor: '#043A53',
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
    color: '#FFFF',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,

  },
  card: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    padding: 30,
    paddingRight: 0,
    borderRadius: 12,
    paddingLeft: 15
  },
  label: {
    fontSize: 15,
    color: '#043A53',
    fontWeight: '500'
  },
  value: {
    fontSize: 12,
    marginTop: 6,
    color: '#043A53B2'
  },
  price: {
    fontSize: 15,
    color: '#22C55E',
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
    backgroundColor: '#f0fdf4',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 20,
    marginBottom: 10,
  },

  featureText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#166534',
  },
});
