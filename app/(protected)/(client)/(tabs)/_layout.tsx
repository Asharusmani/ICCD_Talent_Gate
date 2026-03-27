import { HapticTab } from '@/components/haptic-tab';
import ProfileHeader from '@/components/header/profile-header';
import Header from '@/components/header/tabs-header';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Tabs, useNavigation } from 'expo-router';
import { House } from 'lucide-react-native';

export default function ClientTabsLayout() {
  const navigation = useNavigation();

  return (
    <Tabs
      screenOptions={{
        // Tab bar styling
        tabBarActiveTintColor: '#40ADB6',
        tabBarInactiveTintColor: '#000000',
        tabBarStyle: {
          borderTopColor: '#E5E5EA',
          borderTopWidth: 1,
          // height: Platform.OS === 'ios' ? 55 : 60,
          // position: "absolute",
          // paddingVertical: 40,
          // bottom: 10,
          // marginHorizontal: 15,
          // borderRadius: 20,
          // ...SHADOWS.large
        },
        header: ({options}) => <Header title={options.title || 'N/A'}/>,
        headerShown: true,
        tabBarButton: HapticTab,
      }}
    >
      {/* DASHBOARD TAB */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <House size={size} color={color} />
          ),
          headerTitle: 'Home',
        }}
      />

      {/* ORDERS TAB */}
      <Tabs.Screen
        name="order"
        options={{
          headerShown: true,
          title: 'Orders',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shopping-cart" size={size} color={color} />
          ),
          headerTitle: 'My Orders',
        }}
      />

      {/* PROFILE TAB */}
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: true,
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          headerTitle: 'Profile',
          header: () => <ProfileHeader title="Profile" />
        }}
      />

      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="menu" size={size} color={color} /> // Changed to menu icon for clarity
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.openDrawer();
          },
        })}
      />

    </Tabs>
  );
}