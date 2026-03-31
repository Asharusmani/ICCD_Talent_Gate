import React from 'react'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, Text, TouchableOpacity, View, StyleSheet } from "react-native";

function GigCard2({ item }: any) {
    return (
        <Pressable onPress={() => router.push(`/posted-gigs/${item.id}/edit-gig-overview`)}>
            <View style={styles.card}>

                {/* Image */}
                <Image
                    source={{ uri: item.gigsFiles }}
                    style={styles.cardImage}
                    resizeMode="cover"
                />

                {/* Content */}
                <View style={styles.cardContent}>
                    <Text style={styles.cardDesc} numberOfLines={2}>{item.title}</Text>

                    <View style={styles.tagRow}>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>{item.category}</Text>
                        </View>
                        <View style={[styles.tag, styles.tagSecondary]}>
                            <Text style={[styles.tagText, styles.tagTextSecondary]}>{item.subCategory}</Text>
                        </View>
                    </View>

                    <Text style={styles.typeText}>{item.type}</Text>
                </View>

                {/* Menu */}
                <TouchableOpacity style={styles.menuBtn}>
                    <MaterialCommunityIcons name="dots-vertical" size={22} color="#94a3b8" />
                </TouchableOpacity>

            </View>
        </Pressable>
    )
}

export default GigCard2

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
        elevation: 3,
        shadowColor: '#0d9488',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        position: "relative",
        alignItems: "center",
        borderWidth: 1,
        borderColor: 'rgba(14,165,233,0.10)',
    },

    cardImage: {
        width: 90,
        height: 90,
        borderRadius: 12,
        backgroundColor: '#e2e8f0',
    },

    cardContent: {
        flex: 1,
        marginLeft: 12,
        justifyContent: "center",
        gap: 6,
        paddingRight: 24,
    },

    menuBtn: {
        position: "absolute",
        right: 8,
        top: 8,
        padding: 4,
    },

    cardDesc: {
        fontSize: 14,
        color: '#0f172a',
        fontWeight: "700",
        lineHeight: 20,
    },

    tagRow: {
        flexDirection: 'row',
        gap: 6,
        flexWrap: 'wrap',
    },
    tag: {
        backgroundColor: 'rgba(13,148,136,0.10)',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    tagSecondary: {
        backgroundColor: 'rgba(8,145,178,0.10)',
    },
    tagText: {
        fontSize: 11,
        color: '#0d9488',
        fontWeight: '600',
    },
    tagTextSecondary: {
        color: '#0891b2',
    },

    typeText: {
        fontSize: 11,
        color: '#94a3b8',
        fontWeight: '400',
    },
});