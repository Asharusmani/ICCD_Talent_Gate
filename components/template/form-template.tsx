import React from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    StyleProp,
    ViewStyle
} from 'react-native';

interface FormTemplateProps {
    containerStyle?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;
    children: React.ReactNode
}

const FormTemplate = ({ containerStyle, contentStyle, children }: FormTemplateProps) => {
    return (
        <KeyboardAvoidingView
            style={[styles.container, containerStyle]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
            <ScrollView
                contentContainerStyle={[styles.scrollContent, contentStyle]}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                contentInset={{ bottom: 40 }}
            >
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default FormTemplate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        // padding: 12,
    },
});
