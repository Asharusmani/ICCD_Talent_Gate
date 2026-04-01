import { StyleSheet, Text, View } from 'react-native';

export default function OrderCategory({ category }: any) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Category</Text>
      <View style={styles.chip}>
        <Text style={styles.chipText}>{category}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 15,
    marginBottom: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 28,
  },
  chip: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(13,148,136,0.10)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(13,148,136,0.20)',
  },
  chipText: {
    fontSize: 13,
    color: '#0d9488',
    fontWeight: '600',
    marginLeft: -3,
  },
});