import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Platform, 
  TouchableOpacity, 
  Modal,
  Pressable,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

type Option = {
  label: string;
  value: string;
};

type Props = {
  label?: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: Option[];
  required?: boolean;
  placeholder?: string;
};

const SelectBox = ({
  label,
  selectedValue,
  onValueChange,
  options,
  required = false,
  placeholder = 'Select an option',
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [tempValue, setTempValue] = useState(selectedValue);

  // Get selected label for display
  const selectedLabel = options.find(opt => opt.value === selectedValue)?.label || placeholder;

  // iOS: Modal Picker
  if (Platform.OS === 'ios') {
    return (
      <View style={styles.wrapper}>
        {label && (
          <Text style={styles.label}>
            {label} {required && <Text style={styles.required}>*</Text>}
          </Text>
        )}

        <TouchableOpacity 
          style={styles.iosPickerButton}
          onPress={() => {
            setTempValue(selectedValue);
            setShowModal(true);
          }}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.iosPickerButtonText,
            !selectedValue && styles.placeholderText
          ]}>
            {selectedLabel}
          </Text>
          {/* <Ionicons name="chevron-down" size={20} color="#6B7280" /> */}
        </TouchableOpacity>

        <Modal
          visible={showModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowModal(false)}
        >
          <Pressable 
            style={styles.modalOverlay}
            onPress={() => setShowModal(false)}
          >
            <Pressable style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <Text style={styles.cancelButton}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.modalTitle}>{label || 'Select'}</Text>
                <TouchableOpacity 
                  onPress={() => {
                    onValueChange(tempValue);
                    setShowModal(false);
                  }}
                >
                  <Text style={styles.doneButton}>Done</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={tempValue}
                  onValueChange={(value) => setTempValue(value)}
                  itemStyle={styles.iosPickerItem}
                >
                  <Picker.Item label={placeholder} value="" color="#999" />
                  {options.map((opt) => (
                    <Picker.Item
                      key={opt.value}
                      label={opt.label}
                      value={opt.value}
                    />
                  ))}
                </Picker>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    );
  }

  // Android: Native Dropdown Picker
  return (
    <View style={styles.wrapper}>
      {label && (
        <Text style={styles.label}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}

      <View style={styles.androidPickerWrapper}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.androidPicker}
          dropdownIconColor="#6B7280"
        >
          <Picker.Item label={placeholder} value="" enabled={false} color="#999" />
          {options.map((opt) => (
            <Picker.Item
              key={opt.value}
              label={opt.label}
              value={opt.value}
            />
          ))}
        </Picker>
      </View>
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

  // iOS Styles
  iosPickerButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  iosPickerButtonText: {
    fontSize: 14,
    color: '#111827',
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34, // For safe area
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  cancelButton: {
    fontSize: 16,
    color: '#6B7280',
  },
  doneButton: {
    fontSize: 16,
    color: '#15A9B2',
    fontWeight: '600',
  },
  pickerContainer: {
    backgroundColor: '#fff',
  },
  iosPickerItem: {
    height: 180,
    fontSize: 16,
  },

  // Android Styles
  androidPickerWrapper: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  androidPicker: {
    height: 50,
    color: '#111827',
  },
});

export default SelectBox;


// Mohid Code

// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { Picker } from '@react-native-picker/picker';

// type Option = {
//   label: string;
//   value: string;
// };

// type Props = {
//   label?: string;
//   selectedValue: string;
//   onValueChange: (value: string) => void;
//   options: Option[];
//   required?: boolean;
// };

// const SelectBox = ({
//   label,
//   selectedValue,
//   onValueChange,
//   options,
//   required = false,
// }: Props) => {
//   return (
//     <View style={styles.wrapper}>
//       {label && (
//         <Text style={styles.label}>
//           {label} {required && <Text style={styles.required}>*</Text>}
//         </Text>
//       )}

//       <View style={styles.pickerWrapper}>
//         <Picker
//           selectedValue={selectedValue}
//           onValueChange={onValueChange}
//         >
//           <Picker.Item label="Select an option" value="" />
//           {options.map((opt) => (
//             <Picker.Item
//               key={opt.value}
//               label={opt.label}
//               value={opt.value}
//             />
//           ))}
//         </Picker>
//       </View>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   wrapper: {
//     marginBottom: 14,
//   },
//   label: {
//     fontSize: 13,
//     fontWeight: '600',
//     marginBottom: 6,
//     color: '#111827',
//   },
//   required: {
//     color: '#dc2626',
//   },
//   pickerWrapper: {
//     backgroundColor: '#f3f4f6',
//     borderRadius: 8,
//     overflow: 'hidden',
//   },
// });

// export default SelectBox;