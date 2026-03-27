import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/utils/auth-context';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { usePathname, useRouter } from 'expo-router';
import { ArrowLeftRight, FolderDot, Home, LogOut, SquareChartGantt, UserX } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CustomClientDrawer = (props) => {

  const router = useRouter();
  const pathname = usePathname();
  const colorScheme = useColorScheme();
  const { logout } = useAuth()
  const isDark = colorScheme === 'dark';

  // Define only the routes you want to show in the drawer
  const drawerItems = [
    {
      label: 'Home',
      route: '/',
      icon: Home,
    },
    {
      label: 'Posted Projects',
      route: '/posted-project',
      icon: FolderDot,
    },
    {
      label: 'Posted Jobs',
      route: '/posted-job',
      icon: SquareChartGantt,
    },
    {
      label: 'Dispute List',
      route: '/client-dispute-list',
      icon: UserX,
    },
    // Uncomment when you want to add these
    {
      label: 'Switch To Freelancer',
      route: '/(protected)/(isFreelancerProfile)/',
      icon: ArrowLeftRight,
    },
  ];

  const handleNavigation = (route) => {
    router.push(route);
    props.navigation.closeDrawer();
  };

  const isActive = (route: any) => {
    // For home route, check if pathname is exactly '/' or starts with '/(tabs)'
    if (route === '/') {
      return pathname === '/' || pathname === '';
    }
    // For other routes, check if pathname includes the route

    return pathname.includes(route);
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[
        styles.container,
        { backgroundColor: isDark ? '#1a1a1a' : '#fff' }
      ]}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <View style={[
          styles.avatar,
          { backgroundColor: isDark ? '#333' : '#e0e0e0' }
        ]}>
          <Text style={[
            styles.avatarText,
            { color: isDark ? '#fff' : '#000' }
          ]}>
            CL
          </Text>
        </View>
        <Text style={[
          styles.userName,
          { color: isDark ? '#fff' : '#000' }
        ]}>
          Client Dashboard
        </Text>
        <Text style={[
          styles.userEmail,
          { color: isDark ? '#999' : '#666' }
        ]}>
          client@example.com
        </Text>
      </View>

      {/* Divider */}
      <View style={[
        styles.divider,
        { backgroundColor: isDark ? '#333' : '#e0e0e0' }
      ]} />

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {drawerItems.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.route);

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                active && styles.menuItemActive,
                { backgroundColor: active ? (isDark ? '#333' : '#f0f0f0') : 'transparent' }
              ]}
              onPress={() => handleNavigation(item.route)}
            >
              <Icon
                size={22}
                color={active ? '#075458' : (isDark ? '#999' : '#666')}
                fill={active ? '#075458' : 'none'}
              />
              <Text style={[
                styles.menuLabel,
                { color: active ? '#075458' : (isDark ? '#fff' : '#000') },
                active && styles.menuLabelActive
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <View style={[
          styles.divider,
          { backgroundColor: isDark ? '#333' : '#e0e0e0' }
        ]} />
        <TouchableOpacity
          style={styles.menuItem}
          onPress={logout}
        >
          <LogOut
            size={22}
            color={isDark ? '#999' : '#666'}
          />
          <Text style={[
            styles.menuLabel,
            { color: isDark ? '#fff' : '#000' }
          ]}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  header: {
    padding: 20,
    paddingBottom: 15,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
  },
  divider: {
    height: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 6,
  },
  menuItemActive: {
    // Active state styles
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 16,
  },
  menuLabelActive: {
    fontWeight: '700',
  },
  footer: {
    // paddingHorizontal: 12,
    paddingBottom: 20,
  },
});

export default CustomClientDrawer;