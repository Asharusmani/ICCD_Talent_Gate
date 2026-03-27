import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileMenuItem({ icon, label, onPress }: any) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.left}>
        <Ionicons name={icon} size={20} color="#115B60" />
        <Text style={styles.text}>{label}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#15A9B2" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 22,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 14,
    color: '#111827',
  },
});
