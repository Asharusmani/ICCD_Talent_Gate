import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, TouchableOpacity, Text, FlatList, Alert } from 'react-native';

const items = [
  { icon: 'person-outline',       label: 'Edit Profile',   subtitle: 'Update your info',      route: '/edit-profile', color: '#15A9B2' },
  { icon: 'headset-outline',      label: 'Support',        subtitle: 'Get help anytime',       route: '/support',      color: '#0891b2' },
  { icon: 'help-circle-outline',  label: 'FAQ',            subtitle: 'Common questions',       route: '/faq',          color: '#7c3aed' },
  { icon: 'share-social-outline', label: 'Invite Friends', subtitle: 'Share & earn rewards',   route: '/invite',       color: '#059669' },
  { icon: 'log-out-outline',      label: 'Logout',         subtitle: 'Sign out of account',    route: '/login',        color: '#ef4444', danger: true },
];

export default function ProfileMenu() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>Account Settings</Text>
      <FlatList
        data={items}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            activeOpacity={0.7}
            onPress={() => {
              if (item.danger) {
                Alert.alert('Logout', 'Are you sure you want to logout?', [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Logout', style: 'destructive', onPress: () => router.replace('/login') },
                ]);
              } else {
                router.push(item.route as any);
              }
            }}
          >
            <View style={styles.left}>
              <View style={[styles.iconBox, { backgroundColor: `${item.color}18` }]}>
                <Ionicons name={item.icon as any} size={20} color={item.color} />
              </View>
              <View style={styles.labelBlock}>
                <Text style={[styles.label, item.danger && styles.dangerText]}>{item.label}</Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>
            </View>
            {!item.danger && (
              <View style={styles.chevronWrap}>
                <Ionicons name="chevron-forward" size={16} color="#15A9B2" />
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 4,
  },
  listContent: {
    paddingBottom: 100,
  },
  separator: {
    height: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 0.5,
    borderColor: '#e5e7eb',
    paddingVertical: 12,
    paddingHorizontal: 14,
    shadowColor: '#0a4f54',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  labelBlock: {
    gap: 2,
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  dangerText: {
    color: '#ef4444',
  },
  subtitle: {
    fontSize: 12,
    color: '#94a3b8',
  },
  chevronWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#e0f7f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});