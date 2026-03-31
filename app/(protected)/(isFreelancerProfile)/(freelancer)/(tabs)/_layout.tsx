import ProfileHeader from '@/components/header/profile-header';
import TabsHeader from '@/components/header/tabs-header';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Tabs, useNavigation } from 'expo-router';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import OrderHeader from '@/components/header/OrderHeader';

export default function FreelancerTabsLayout() {
  const navigation = useNavigation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0d9488',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopColor: 'rgba(14,165,233,0.18)',
          borderTopWidth: 1,
          position: 'absolute',
          elevation: 0,
        },
        tabBarBackground: () => (
          <BlurView
            intensity={40}
            tint="light"
            style={StyleSheet.absoluteFill}
          />
        ),
        headerShown: true,
        headerTransparent: true,        // ← yeh add karo
        header: ({ route }) => (
          <TabsHeader title={"Dashboard"} />
        ),
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