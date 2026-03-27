import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

type Props = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  required?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric';
};

const InputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  required = false,
  keyboardType = 'default',
}: Props) => {
  return (
    <View style={styles.wrapper}>
      {label && (
        <Text style={styles.label}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholderTextColor="#9ca3af"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    color: '#111827',
  },
  required: {
    color: '#dc2626',
  },
  input: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
    color: '#111827',
  },
});

export default InputField;