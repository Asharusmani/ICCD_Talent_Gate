import { HapticTab } from '@/components/haptic-tab';
import ProfileHeader from '@/components/header/profile-header';
import Header from '@/components/header/tabs-header';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { House, ShoppingBag } from 'lucide-react-native';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ClientTabsLayout() {
  const insets = useSafeAreaInsets();

  const tabBarHeight = Platform.OS === 'ios' ? 45 + insets.bottom : 100;
  const tabBarPaddingBottom = Platform.OS === 'ios' ? insets.bottom + 4 : 10;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0d9488',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          borderTopColor: 'rgba(14,165,233,0.18)',
          borderTopWidth: 1,
          backgroundColor: '#ffffff',
          height: tabBarHeight,
          paddingBottom: tabBarPaddingBottom,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        headerTransparent: true,
        header: ({ options }) => <Header title={options.title || ''} />,
        headerShown: true,
        tabBarButton: HapticTab,
      }}
    >
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

      <Tabs.Screen
        name="order"
        options={{
          headerShown: true,
          title: 'Orders',
          tabBarIcon: ({ color, size }) => (
            <ShoppingBag size={size} color={color} />
          ),
          headerTitle: 'My Orders',
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
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
            <Ionicons name="menu-outline" size={size} color={color} />
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