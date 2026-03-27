import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ButtonRN from './button';
import { Background } from '@react-navigation/elements';

export default function ErrorScreen({ onRetry }) {
  return (
    <View style={styles.container}>

      {/* <Image
        source={require('@/assets/images/error-background.png')}
        style={styles.backgroundImage}
      /> */}
      <Image
        source={require('@/assets/images/error-image.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.subtitle}>
        We couldn't load the page. Please check your internet and try again.
      </Text>

      {/* 3. Action Button */}
      <ButtonRN
        style={styles.button}
      >
        Retry
      </ButtonRN>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative", alignItems: 'center', justifyContent: 'center' },
  backgroundImage:{zIndex: -1,position: 'absolute', top:0, alignItems:"center", width: "100%"},
  image: { height: 200, width: 200, objectFit: "contain" },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 30 },
  button: { backgroundColor: '#11445C', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});