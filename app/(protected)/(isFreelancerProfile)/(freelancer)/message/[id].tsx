import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import {
    FlatList,
    KeyboardAvoidingView, // Recommended for Chat
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

const messages = [
  { id: "1", text: "Hello 👋 how can I help you?", time: "09:24 pm", sender: "me" },
  { id: "2", text: "Need an app.", time: "09:24 pm", sender: "other" },
  { id: "3", text: "Sure! Flutter or web?", time: "09:24 pm", sender: "me" },
  { id: "4", text: "Yeh! Flutter", time: "09:24 pm", sender: "other" },
];

export default function Chatting() {
  const router = useRouter();

  const renderItem = ({ item }: any) => {
    const isMe = item.sender === "me";
    return (
      <View style={[styles.messageContainer, isMe ? styles.myMessage : styles.otherMessage]}>
        <Text style={[styles.messageText, { color: isMe ? "#fff" : "#000" }]}>{item.text}</Text>
        <Text style={[styles.timeText, { color: isMe ? "#eee" : "#555" }]}>{item.time}</Text>
      </View>
    );
  };

  return (
    // Change SafeAreaView to View to allow header to reach the top
    <View style={styles.mainContainer}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.userInfo}>
            <View style={styles.avatar} />
            <Text style={styles.userName}>Wardah Mushtaq</Text>
          </View>
        </View>
      </View>

      {/* KeyboardAvoidingView is better for chat screens */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : undefined} 
        style={{ flex: 1 }}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.chatArea}
          showsVerticalScrollIndicator={false}
        />

        {/* Input area - using paddingBottom for devices with a bottom notch */}
        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Type a message"
              style={styles.input}
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.sendBtn}>
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