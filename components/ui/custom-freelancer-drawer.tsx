import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/utils/auth-context';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { usePathname, useRouter } from 'expo-router';
import { ArrowLeftRight, FolderDot, Home, LogOut, UserX } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ACCENT = '#0d9488';
const BORDER = 'rgba(14,165,233,0.18)';
const TEXT_PRIMARY = '#0f172a';
const TEXT_SECONDARY = 'rgba(15,23,42,0.50)';

const CustomFreelancerDrawer = (props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();

  const drawerItems = [
    { label: 'Dashboard', route: '/', icon: Home },
    { label: 'Posted Gigs', route: '/posted-gigs', icon: FolderDot },
    { label: 'Dispute List', route: '/freelancer-dispute-list', icon: UserX },
    { label: 'Jobs', route: '/job', icon: UserX },
    { label: 'Projects', route: '/project', icon: UserX },
    { label: 'Switch To Client', route: '/(protected)/(client)/(tabs)', icon: ArrowLeftRight },
  ];

  const handleNavigation = (route) => {
    router.push(route);
    props.navigation.closeDrawer();
  };

  const isActive = (route) => {
    if (route === '/') return pathname === '/' || pathname === '';
    return pathname.includes(route);
  };

  return (
    <LinearGradient
      colors={['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.6, y: 1 }}
    >
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarWrap}>
            <LinearGradient
              colors={[ACCENT, '#0891b2']}
              style={styles.avatar}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.avatarText}>FL</Text>
            </LinearGradient>
            <View style={styles.onlineDot} />
          </View>
          <Text style={styles.userName}>Freelancer Dashboard</Text>
          <Text style={styles.userEmail}>freelancer@example.com</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {drawerItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.route);

            return (
              <TouchableOpacity
                key={index}
                style={[styles.menuItem, active && styles.menuItemActive]}
                onPress={() => handleNavigation(item.route)}
                activeOpacity={0.8}
              >
                <View style={[styles.menuIconBox, active && styles.menuIconBoxActive]}>
                  <Icon size={18} color={active ? '#fff' : ACCENT} />
                </View>
                <Text style={[styles.menuLabel, active && styles.menuLabelActive]}>
                  {item.label}
                </Text>
                {active && <View style={styles.activePill} />}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={logout}
            activeOpacity={0.8}
          >
            <View style={styles.logoutIconBox}>
              <LogOut size={18} color="#f43f5e" />
            </View>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

      </DrawerContentScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 10,
  },
  avatarWrap: {
    position: 'relative',
    alignSelf: 'flex-start',
    marginBottom: 14,
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.60)',
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: '#e0f2fe',
  },
  userName: {
    fontSize: 18,
    fontWeight: '800',
    color: TEXT_PRIMARY,
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  userEmail: {
    fontSize: 13,
    color: TEXT_SECONDARY,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: BORDER,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 6,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginBottom: 6,
    backgroundColor: 'transparent',
  },
  menuItemActive: {
    backgroundColor: 'rgba(255,255,255,0.70)',
    borderWidth: 1,
    borderColor: BORDER,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(13,148,136,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuIconBoxActive: {
    backgroundColor: ACCENT,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: TEXT_SECONDARY,
    flex: 1,
  },
  menuLabelActive: {
    color: TEXT_PRIMARY,
    fontWeight: '700',
  },
  activePill: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: ACCENT,
  },
  footer: {
    paddingBottom: 24,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 4,
  },
  logoutIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(244,63,94,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#f43f5e',
  },
});

export default CustomFreelancerDrawer;