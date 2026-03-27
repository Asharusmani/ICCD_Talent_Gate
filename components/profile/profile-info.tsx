import { StyleSheet, Text, View } from 'react-native';

export default function ProfileInfo() {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Syed Mohiuddin</Text>
      <Text style={styles.email}>mohid@gmail.com</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // height: 10,
    backgroundColor: "#F9F9F9",
    paddingLeft: 20,
    // borderTopEndRadius: 10,
    // borderTopStartRadius: 10
    // alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  email: {
    fontSize: 12,
    color: '#6B7280',
    // marginTop: 4,
  },
});
