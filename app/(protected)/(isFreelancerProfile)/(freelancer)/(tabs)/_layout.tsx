import ProfileHeader from '@/components/header/profile-header';
import TabsHeader from '@/components/header/tabs-header';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Tabs, useNavigation } from 'expo-router';

export default function FreelancerTabsLayout() {
  const navigation = useNavigation();

  return (
    <Tabs
      screenOptions={{
        // Tab bar styling
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E5EA',
          borderTopWidth: 1,
          // height: Platform.OS === 'ios' ? 85 : 60,
          // paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          // paddingTop: 10,
        },
        // Header with drawer toggle
        headerShown: true,
        header: () => <TabsHeader />,
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
          headerTitle: 'Dashboard',
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
          headerTitle: 'My Profile',
          header: () => <ProfileHeader title="Profile" />
        }}
      />

    </Tabs>
  );
}