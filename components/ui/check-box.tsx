import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

interface CheckBoxProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

function CheckBox({ label, value, onValueChange }: CheckBoxProps) {
  return (
    <TouchableOpacity style={styles.checkItem} onPress={() => onValueChange(!value)} activeOpacity={0.7}>
      <View style={[styles.checkbox, value && styles.checkedBox]}>
        {value && <Ionicons name="checkmark" size={16} color="#fff" />}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

export default CheckBox

const styles = StyleSheet.create({
  checkItem: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  checkbox: { width: 24, height: 24, borderWidth: 2, borderColor: "#D1D5DB", borderRadius: 6, marginRight: 10, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  checkedBox: { backgroundColor: "#043A53", borderColor: "#043A53" },
  checkboxLabel: { fontSize: 14, color: "#374151", fontWeight: "500" },
});