import { StyleSheet, Text, View } from 'react-native';

export default function OrderDescription({ description }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Description</Text>
      <View style={styles.box}>
        <Text style={styles.text}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 14,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
    color: '#0f172a',
    marginBottom: 25,
  },
  box: {
    backgroundColor: '#eef2f3',
    borderRadius: 10,
    padding: 14,
  },
  text: {
    fontSize: 13,
    lineHeight: 18,
    color: '#334155',
  },
});
