import { formatTo12HourTime } from "@/functions/date-format";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    FlatList,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft } from 'lucide-react-native';

const ACCENT = '#0d9488';
const BORDER = 'rgba(14,165,233,0.18)';
const TEXT_PRIMARY = '#0f172a';
const TEXT_SECONDARY = '#6b7280';

// ── Dummy messages
const DUMMY_MESSAGES = [
    { id: 1, senderId: 2, receiverId: 1, messages: "You can now communicate with each other", created_at: new Date('2024-01-01T10:00:00') },
    { id: 2, senderId: 2, receiverId: 1, messages: "Hello! I saw your project posting.", created_at: new Date('2024-01-01T10:01:00') },
    { id: 3, senderId: 1, receiverId: 2, messages: "Hi! Yes, I need a mobile app developed.", created_at: new Date('2024-01-01T10:02:00') },
    { id: 4, senderId: 2, receiverId: 1, messages: "I have 5 years of React Native experience. Can we discuss the details?", created_at: new Date('2024-01-01T10:03:00') },
    { id: 5, senderId: 1, receiverId: 2, messages: "Sure! What is your availability?", created_at: new Date('2024-01-01T10:04:00') },
    { id: 6, senderId: 2, receiverId: 1, messages: "I am available starting next week. I can dedicate 40 hours per week to your project.", created_at: new Date('2024-01-01T10:05:00') },
    { id: 7, senderId: 1, receiverId: 2, messages: "That sounds great! What is your rate?", created_at: new Date('2024-01-01T10:06:00') },
    { id: 8, senderId: 2, receiverId: 1, messages: "My rate is $50/hour. I can also do a fixed price if you prefer.", created_at: new Date('2024-01-01T10:07:00') },
    { id: 9, senderId: 1, receiverId: 2, messages: "Let me think about it and get back to you.", created_at: new Date('2024-01-01T10:08:00') },
    { id: 10, senderId: 2, receiverId: 1, messages: "No problem! Take your time. 😊", created_at: new Date('2024-01-01T10:09:00') },
];

const MY_USER_ID = 1; // dummy logged in user

export default function Chatting() {
    const insets = useSafeAreaInsets();
    const [messages, setMessages] = useState<any[]>([...DUMMY_MESSAGES].reverse());
    const [messageInput, setMessageInput] = useState("");

    const handleSend = () => {
        if (!messageInput.trim()) return;
        const newMsg = {
            id: Date.now(),
            senderId: MY_USER_ID,
            receiverId: 2,
            messages: messageInput.trim(),
            created_at: new Date(),
        };
        setMessages((prev) => [newMsg, ...prev]);
        setMessageInput("");
    };

    const renderItem = ({ item }: any) => {
        const isMe = item.senderId === MY_USER_ID;
        const isIntro = item.messages === "You can now communicate with each other";

        if (isIntro) {
            return (
                <View style={styles.introWrapper}>
                    <View style={styles.introBox}>
                        <Text style={styles.introText}>{item.messages}</Text>
                    </View>
                </View>
            );
        }

        return (
            <View style={[
                styles.bubbleWrapper,
                isMe ? styles.bubbleWrapperMe : styles.bubbleWrapperOther,
            ]}>
                <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
                    <Text style={[styles.bubbleText, { color: isMe ? '#fff' : TEXT_PRIMARY }]}>
                        {item.messages}
                    </Text>
                    <Text style={[styles.timeText, { color: isMe ? 'rgba(255,255,255,0.65)' : TEXT_SECONDARY }]}>
                        {formatTo12HourTime(item.created_at)}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <LinearGradient
            colors={['#f0f9ff', '#e0f2fe', '#bae6fd']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.6, y: 1 }}
        >
            {/* ── Header ── */}
            <View style={[styles.header, { paddingTop:  10 }]}>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.8}>
                    <ChevronLeft size={22} color={ACCENT} />
                </TouchableOpacity>

                <View style={styles.userInfoRow}>
                    <View style={styles.avatarCircle}>
                        <Text style={styles.avatarText}>FR</Text>
                    </View>
                    <View style={styles.userTextBlock}>
                        <Text style={styles.userName}>Freelancer</Text>
                        <View style={styles.onlineRow}>
                            <View style={styles.onlineDot} />
                            <Text style={styles.onlineText}>Online</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.headerIconBtn}>
                    <Ionicons name="call-outline" size={19} color={ACCENT} />
                </TouchableOpacity>
            </View>

            {/* ── Messages + Input ── */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
                style={{ flex: 1 }}
            >
                <FlatList
                    data={messages}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.chatArea}
                    showsVerticalScrollIndicator={false}
                    inverted
                />

                {/* ── Input Bar ── */}
                <View style={[styles.inputWrapper, { paddingBottom: insets.bottom + 10 }]}>
                    <View style={styles.inputRow}>
                        <TextInput
                            value={messageInput}
                            placeholder="Type a message..."
                            style={styles.input}
                            placeholderTextColor="rgba(15,23,42,0.35)"
                            onChangeText={setMessageInput}
                            multiline
                            maxLength={500}
                        />
                        <TouchableOpacity
                            onPress={handleSend}
                            style={[styles.sendBtn, !messageInput.trim() && styles.sendBtnDisabled]}
                            activeOpacity={0.8}
                            disabled={!messageInput.trim()}
                        >
                            <LinearGradient
                                colors={[ACCENT, '#0891b2']}
                                style={styles.sendGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                <Ionicons name="send" size={18} color="#fff" />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: BORDER,
        backgroundColor: 'rgba(255,255,255,0.50)',
        gap: 12,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.80)',
        borderWidth: 1,
        borderColor: BORDER,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    userInfoRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    avatarCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(13,148,136,0.15)',
        borderWidth: 1.5,
        borderColor: 'rgba(13,148,136,0.35)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: 14,
        fontWeight: '800',
        color: ACCENT,
    },
    userTextBlock: { gap: 2 },
    userName: {
        fontSize: 15,
        fontWeight: '700',
        color: TEXT_PRIMARY,
    },
    onlineRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    onlineDot: {
        width: 7,
        height: 7,
        borderRadius: 4,
        backgroundColor: '#10b981',
    },
    onlineText: {
        fontSize: 11,
        color: '#10b981',
        fontWeight: '600',
    },
    headerIconBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: 'rgba(255,255,255,0.80)',
        borderWidth: 1,
        borderColor: BORDER,
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    chatArea: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        paddingBottom: 20,
    },
    bubbleWrapper: {
        marginBottom: 10,
        maxWidth: '78%',
    },
    bubbleWrapperMe: { alignSelf: 'flex-end' },
    bubbleWrapperOther: { alignSelf: 'flex-start' },
    bubble: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 18,
    },
    bubbleMe: {
        backgroundColor: ACCENT,
        borderBottomRightRadius: 4,
    },
    bubbleOther: {
        backgroundColor: 'rgba(255,255,255,0.88)',
        borderWidth: 1,
        borderColor: BORDER,
        borderBottomLeftRadius: 4,
    },
    bubbleText: {
        fontSize: 15,
        lineHeight: 21,
    },
    timeText: {
        fontSize: 10,
        alignSelf: 'flex-end',
        marginTop: 4,
        fontWeight: '500',
    },
    introWrapper: {
        alignItems: 'center',
        marginVertical: 12,
    },
    introBox: {
        backgroundColor: 'rgba(255,255,255,0.75)',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: BORDER,
        paddingHorizontal: 16,
        paddingVertical: 7,
    },
    introText: {
        fontSize: 12,
        color: TEXT_SECONDARY,
        fontWeight: '500',
        textAlign: 'center',
    },
    inputWrapper: {
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderTopWidth: 1,
        borderTopColor: BORDER,
        paddingTop: 10,
        paddingHorizontal: 12,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 8,
    },
    input: {
        flex: 1,
        minHeight: 44,
        maxHeight: 110,
        backgroundColor: 'rgba(14,165,233,0.06)',
        borderRadius: 22,
        borderWidth: 1,
        borderColor: BORDER,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 15,
        color: TEXT_PRIMARY,
    },
    sendBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        overflow: 'hidden',
        flexShrink: 0,
    },
    sendBtnDisabled: { opacity: 0.45 },
    sendGradient: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
});