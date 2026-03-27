import React from 'react'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, Text, TouchableOpacity, View, StyleSheet } from "react-native";

function GigCard2({ item }: any) {
    return (
        <Pressable onPress={() => router.push(`/posted-gigs/${item.id}/edit-gig-overview`)}>
            <View style={styles.card}>
                <Image source={{uri: item.gigsFiles}} style={styles.cardImage} resizeMode="cover" />
                <View style={styles.cardContent}>
                    <Text style={styles.cardDesc}>{item.title}</Text>
                    <Text style={styles.categoryText}>Category: {item.category}</Text>
                    <Text style={styles.categoryText}>Sub Category: {item.subCategory}</Text>
                    <Text style={styles.typeText}>{item.type}</Text>
                </View>
                <TouchableOpacity style={styles.menuBtn}>
                    <MaterialCommunityIcons name="dots-vertical" size={24} color="#777" />
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
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        elevation: 2,
        position: "relative",
        alignItems: "center"
    },

    cardImage: { width: 120, height: 80, borderRadius: 10 },
    cardContent: { flex: 1, marginLeft: 10, justifyContent: "center" },

    menuBtn: {
        position: "absolute",
        right: 10,
        top: 10
    },

    cardDesc: { fontSize: 14, color: "#075458", fontWeight: "600" },
    categoryText: { fontSize: 12, color: "#075458", fontWeight: "500", marginTop: 4 },
    typeText: { fontSize: 12, color: "#075458", fontWeight: "400", marginTop: 2 }
});