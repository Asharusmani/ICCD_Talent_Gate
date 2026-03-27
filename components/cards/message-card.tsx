import { router } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { formatDateDay } from '@/functions/date-format';

export default function MessageCard({ item }: any) {
  return (
    <TouchableOpacity onPress={
      () => router.push({
        pathname: `/message/${item.chat_partner_id}`,
        params: { receiverId: item.receiverId, senderId: item.senderId, name: item.chat_partner_name }
      })}>
      <View style={styles.row}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100' }}
          style={styles.avatar}
        />

        <View style={styles.info}>
          <Text style={styles.name}>{item.chat_partner_name}</Text>
          <Text style={styles.name}>{item.messages}</Text>
        </View>
        <Text style={styles.date}>{formatDateDay(item.created_at)}</Text>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#dfdedeff',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontFamily: 'Poppins-Medium',
  },
  date: {
    fontSize: 11,
    color: '#9CA3AF',
  },
});