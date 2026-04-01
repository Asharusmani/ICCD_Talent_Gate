import React from 'react';
import { Search } from 'lucide-react-native';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  KeyboardTypeOptions 
} from 'react-native';
import { HeaderHeightContext } from '@react-navigation/elements';

interface SearchBarProps {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  required?: boolean;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  numberOfLines?: number;
}

export default function SearchBar({
  label,
  placeholder,
  value,
  onChangeText,
  required = false,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      
      <View style={styles.inputWrapper}>
        <Search style={styles.icon} size={20} color="#15A9B2" />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          value={value}
          onChangeText={onChangeText}
          style={[
            styles.input,
            multiline && styles.inputMultiline
          ]}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical={multiline ? 'top' : 'center'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    
   
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 8,
  },
  required: {
    color: '#dc2626',
  },
  inputWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    left: 12,
    top: 15,
    zIndex: 1,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 12,
    paddingLeft: 40,
    paddingRight: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    fontSize: 14,
    color: '#1f2937',
    height: 50,
  },
  inputMultiline: {
    minHeight: 120,
    paddingTop: 12,
  },
});