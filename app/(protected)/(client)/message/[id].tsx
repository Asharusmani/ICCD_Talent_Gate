import { useGetAllMsgByReceiptant } from "@/api/client/message";
import MessageList from "@/components/ui/message-list";
import { formatTo12HourTime } from "@/functions/date-format";
import { useSocket } from "@/hooks/use-socket";
import { useAuth } from "@/utils/auth-context";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import ICCDLoader from '@/components/ui/loader2';

export default function Chatting() {

  const { user } = useAuth()
  const { receiverId, senderId, id } = useLocalSearchParams()

  const { data: singleData, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetAllMsgByReceiptant({
    userId: senderId,
    recipientId: receiverId,
  });

  const socket = useSocket();
  const [message, setMessage] = useState([])
  const [messageInput, setMessagesInput] = useState("");

  // function for submitting message
  const handleSubmitMessages = () => {
    if (!messageInput.trim() || !user.id) return console.warn("Not Submitted!");
    const newMessage = {
      senderId: user.id,
      receiverId: id,
      messages: messageInput.trim(),
      created_at: new Date(),
    };
    socket.emit("sendMessage", newMessage);
    setMessage((prev) => [newMessage, ...prev])
    setMessagesInput("");
  };

  // set data in useState every time when data change
  useEffect(() => {
    setMessage(singleData)
  }, [singleData])

  // listen when new message come
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessage((prev) => [data, ...prev]);
    };
    socket.on("receive_message", handleReceiveMessage);
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);

  if (isLoading) return <ICCDLoader />

  return (
    <View style={styles.mainContainer}>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        style={{ flex: 1, paddingHorizontal: 10 }}
      >
        <MessageList
          data={message}
          error={error}
          isLoading={isLoading}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          renderItem={({ item }: any) => {
            const isMe = Number(item.senderId) === Number(user.id);
            const introMsg = item.messages === "You can now communicate with each other";
            return (
              <View style={[styles.messageContainer, isMe ? styles.myMessage : introMsg ? styles.intromsg : styles.otherMessage]}>
                <Text style={[styles.messageText, { color: isMe ? "#fff" : "#000" }]}>{item.messages}</Text>
                <Text style={[styles.timeText, { color: isMe ? "#eee" : "#555" }]}>{formatTo12HourTime(item.created_at)}</Text>
              </View>
            )
          }}
        />

        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <TextInput
              value={messageInput}
              placeholder="Type a message"
              style={styles.input}
              placeholderTextColor="#999"
              onChangeText={(text) => setMessagesInput(text)}
            />
            <TouchableOpacity
              onPress={handleSubmitMessages}
              style={styles.sendBtn}>
              <Ionicons name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F4F4F4'
  },

  /* Header */
  header: {
    backgroundColor: "#0A2A43",
    // This is the key: padding top matches the device's status bar height
    paddingTop: Constants.statusBarHeight + 40,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: {
    marginRight: 8,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ddd",
    marginRight: 10,
  },
  userName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  /* Chat Messages */
  chatArea: {
    padding: 16,
    paddingBottom: 10,
  },
  messageContainer: {
    maxWidth: "75%",
    marginBottom: 14,
    padding: 12,
    borderRadius: 15,
  },
  myMessage: {
    backgroundColor: "#1CA7A6",
    alignSelf: "flex-end",
    borderBottomRightRadius: 2, // Bubble effect
  },
  otherMessage: {
    backgroundColor: "#F0F0F0",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 2, // Bubble effect
  },
  intromsg: {
    alignSelf: "center",
    backgroundColor: "#FEFCE8",
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  timeText: {
    fontSize: 10,
    alignSelf: "flex-end",
    marginTop: 4,
  },

  /* Input Container */
  inputWrapper: {
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    paddingBottom: 10, // Handles bottom notch area
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: "#F5F5F5",
    borderRadius: 22,
    paddingHorizontal: 20,
    fontSize: 15,
    color: "#000",
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1CA7A6",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});