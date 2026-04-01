import ProfileHeader from '@/components/header/profile-header';
import TabsFreelancerHeader from '@/components/header/tabs-header-freelancer';
import OrderHeader from '@/components/header/OrderHeader';
import { HapticTab } from '@/components/haptic-tab';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Tabs, useNavigation } from 'expo-router';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function FreelancerTabsLayout() {
  const navigation = useNavigation();
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
        header: ({ options }) => (
          <TabsFreelancerHeader title={options.title ?? ''} />
        ),
        headerShown: true,
        tabBarButton: HapticTab,
      }}
    >
      {/* DASHBOARD TAB */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
        }}
      />

      {/* ORDERS TAB */}
      <Tabs.Screen
        name="order"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shopping-cart" size={size} color={color} />
          ),
          header: () => <OrderHeader title="Order" />
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
          header: () => <ProfileHeader title="Profile" />
        }}
      />

    </Tabs>
  );
}