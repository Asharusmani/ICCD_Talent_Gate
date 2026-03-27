import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ProfileInfo from '@/components/profile/profile-info';
import ProfileMenu from '@/components/profile/profile-menu';
import { SafeAreaView } from 'react-native-safe-area-context';
// import ProfileHeader from "@/components/profile/profile-header";
import ProfileHeader from '@/components/header/profile-header';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* <ProfileHeader /> */}
      <ProfileInfo />
      <ProfileMenu />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4'
  },
});