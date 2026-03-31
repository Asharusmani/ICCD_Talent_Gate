// import React from 'react';
// import { TouchableOpacity, Text, StyleSheet } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';

// const ACCENT = '#4ecdc4';
// const DARKEST = '#091e27';

// type PrimaryButtonProps = {
//     label: string;
//     onPress: () => void;
//     disabled?: boolean;
// };

// export default function PrimaryButton({ label, onPress, disabled = false }: PrimaryButtonProps) {
//     return (
//         <TouchableOpacity
//             style={[styles.button, disabled && styles.disabled]}
//             activeOpacity={0.85}
//             onPress={onPress}
//             disabled={disabled}
//         >
//             <LinearGradient
//                 colors={[ACCENT, '#2aa8a0']}
//                 style={styles.gradient}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//             >
//                 <Text style={styles.label}>{label}</Text>
//             </LinearGradient>
//         </TouchableOpacity>
//     );
// }

// const styles = StyleSheet.create({
//     button: {
//         borderRadius: 14,
//         overflow: 'hidden',
//         shadowColor: ACCENT,
//         shadowOffset: { width: 0, height: 6 },
//         shadowOpacity: 0.4,
//         shadowRadius: 14,
//         elevation: 10,
//         marginTop: 8,
//     },
//     disabled: {
//         opacity: 0.5,
//     },
//     gradient: {
//         paddingVertical: 17,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     label: {
//         color: DARKEST,
//         fontSize: 17,
//         fontWeight: '800',
//         letterSpacing: 0.5,
//     },
// });



// Light mode ke liye
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ACCENT_START = '#0d9488';
const ACCENT_END = '#0891b2';
const TEXT_DARK = '#0f172a';

type PrimaryButtonProps = {
    label: string;
    onPress: () => void;
    disabled?: boolean;
};

export default function PrimaryButton({ label, onPress, disabled = false }: PrimaryButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabled]}
            activeOpacity={0.85}
            onPress={onPress}
            disabled={disabled}
        >
            <LinearGradient
                colors={[ACCENT_START, ACCENT_END]}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <Text style={styles.label}>{label}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 14,
        overflow: 'hidden',
        shadowColor: '#0d9488',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
        marginTop: 8,
    },
    disabled: { opacity: 0.5 },
    gradient: {
        paddingVertical: 17,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
});