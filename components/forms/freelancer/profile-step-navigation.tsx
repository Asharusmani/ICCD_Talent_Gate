import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const STEPS = [
  { number: 1, title: 'Personal Info' },
  { number: 2, title: 'Portfolio & Work Samples' },
  { number: 3, title: 'Professional Info' },
];

type Props = {
  currentStep: 1 | 2 | 3;
  onStepPress?: (step: number) => void;
};

const StepsNavigation = ({ currentStep, onStepPress }: Props) => {
  return (
    <View style={styles.stepsContainer}>
      {STEPS.map((step, index) => {
        const isActive = step.number === currentStep;

        return (
          <TouchableOpacity
            key={step.number}
            style={styles.stepItem}
            activeOpacity={0.7}
            onPress={() => onStepPress?.(step.number)}
          >
            <View style={styles.stepHeader}>
              <View
                style={[
                  styles.stepNumber,
                  isActive && styles.stepNumberActive,
                ]}
              >
                <Text
                  style={[
                    styles.stepNumberText,
                    isActive && styles.stepNumberTextActive,
                  ]}
                >
                  {step.number}
                </Text>
              </View>

              <Text
                style={[
                  styles.stepTitle,
                  isActive && styles.stepTitleActive,
                ]}
              >
                {step.title}
              </Text>

              {index < STEPS.length - 1 && (
                <Text style={styles.stepArrow}>›</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  stepsContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  stepItem: {
    marginBottom: 8,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  stepNumberActive: {
    backgroundColor: '#5f8a8b',
    borderColor: '#5f8a8b',
  },
  stepNumberText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  stepNumberTextActive: {
    color: '#fff',
  },
  stepTitle: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
  },
  stepTitleActive: {
    color: '#111827',
    fontWeight: '600',
  },
  stepArrow: {
    fontSize: 20,
    color: '#d1d5db',
    marginLeft: 6,
  },
});


export default StepsNavigation;
