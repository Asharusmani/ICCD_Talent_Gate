import { formatDateDay } from '@/functions/date-format';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Bell } from "lucide-react-native";
import { SHADOWS } from '@/components/styles/global-style'
export default function NotificationList({ item, onPress }: any) {
  const isUnread = !item.is_read;
  return (
    <TouchableOpacity
      style={[
        styles.item,
        isUnread && styles.unreadItem, // 🔵 unread background
      ]}
      onPress={onPress}
    >
      {/* Avatar */}
      {/* <Image source={{ uri: item.avatar }} style={styles.avatar} /> */}
      <View style={[styles.icon, SHADOWS.medium]} >
        <Bell size={20} color="#000" />
      </View>

      <View style={styles.content}>
        <Text
          style={[
            styles.message,
            isUnread && styles.unreadText,
          ]}
        >
          <Text style={styles.name}>{item.name} </Text>
          {item.message}
        </Text>


        <Text style={styles.time}>{formatDateDay(item.created_at)}</Text>

      </View>

      {isUnread && <View style={styles.dot} />}

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  //   
  item: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 12,
    gap:15,
    backgroundColor: '#fff',
    // alignItems: 'flex-start',
  },
  unreadItem: {
    backgroundColor: '#EEF6FF', // 🔵 unread highlight
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  content: {
    flex: 1,
    paddingRight: 10,
  },
  name: {
    fontWeight: '600',
    color: '#111827',
  },
  message: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 18,
    fontWeight: 600,
  },
  unreadText: {
    color: '#111827',
  },
  icon: {
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderRadius: 20
  },
  time: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 6,
    // alignSelf: "flex-end"
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563EB',
    marginTop: 6,
    marginRight: 8,
  }
});























