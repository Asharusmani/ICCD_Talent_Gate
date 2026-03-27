
import { TouchableOpacity, StyleSheet, Text, StyleProp, ViewStyle } from 'react-native';

interface button {
    isLoading?: boolean;
    handleClick: () => void;
    style?: StyleProp<ViewStyle>;
    children: React.ReactNode;
}
export default function ButtonRN({ isLoading, handleClick, style, children }: button) {
    return (
        <TouchableOpacity disabled={isLoading} style={[styles.button, style]} onPress={handleClick}>
            {/* {children} */}
            <Text style={styles.buttonText}>{children}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: '#15A9B2',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 6,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
