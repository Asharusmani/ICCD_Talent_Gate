import { StyleSheet, Text, View } from 'react-native';

interface OrderDescriptionProps {
  description: string;
}

export default function OrderDescription({ description }: OrderDescriptionProps) {
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
    color: '#0f172a',
    marginBottom: 25,
  },
  box: {
    backgroundColor: 'rgba(255,255,255,0.80)',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(14,165,233,0.15)',
  },
  text: {
    fontSize: 13,
    lineHeight: 18,
    color: '#334155',
  },
});