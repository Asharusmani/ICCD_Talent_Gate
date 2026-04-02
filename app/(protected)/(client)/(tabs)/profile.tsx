import { ScrollView, StyleSheet, View } from 'react-native';
import ProfileInfo from '@/components/profile/profile-info';
import ProfileMenu from '@/components/profile/profile-menu';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProfileInfo />
        <ProfileMenu />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  scrollContent: {
    flexGrow: 1,
    
  },
});