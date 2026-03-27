import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ProfileMenuItem from './profile-menu-item';
import { Label } from '@react-navigation/elements';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Alert, StyleSheet, View, TouchableOpacity, Text, FlatList } from 'react-native';

export default function ProfileMenu() {

  const items = [
    { icon: 'create-outline', label: 'Edit Profile', route: '/profile' },
    { icon: 'headset-outline', label: 'Support', route: '/Support' },
    { icon: 'help-circle-outline', label: 'FAQ', route: '/profile' },
    { icon: 'share-social-outline', label: 'Invite', route: '/profile' },
    { icon: 'log-out-outline', label: 'Logout', route: '/profile' },
  ]

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(_item, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} >
            <View style={styles.left}>
              <View style={styles.iconContainer}>
                <Ionicons name={item.icon} size={20} color="#115B60" />
              </View>
              <Text style={styles.text}>{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#15A9B2" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  itemContainer: {
    display: 'flex',
    gap: 15
  },
  item: {
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#EFF6FF',
    borderRadius: 20
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 14,
    color: '#111827',
  },
  listContent: {
    paddingBottom: 80, // Bottom space for the entire list
  },
});
