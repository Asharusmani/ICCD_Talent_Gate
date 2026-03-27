import { Image, StyleSheet, Text, View } from 'react-native';

export default function ProfileHeader({ title }: any) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title ? title : "My Profile"}</Text>

      <Image
        source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
        style={styles.avatar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#043A53',
    paddingTop: 40,
    paddingBottom: 60,
    alignItems: 'center',
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#fff',
    position: 'absolute',
    bottom: -45,
  },
});
