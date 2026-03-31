import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';

const GigCard = ({ userImage, name, title, description, fileUrl, price, rating, handleClick }: any) => {

    const initials = name
        ?.split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <View style={styles.card}>

            {/* Image */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: fileUrl }} style={styles.image} />

                {/* Rating pill */}
                {rating && (
                    <View style={styles.ratingPill}>
                        <Text style={styles.ratingText}>⭐ {rating}</Text>
                    </View>
                )}

                {/* Save button */}
                <TouchableOpacity style={styles.saveBtn}>
                    <Text style={{ fontSize: 13 }}>🤍</Text>
                </TouchableOpacity>
            </View>

            {/* Content */}
            <View style={styles.content}>

                {/* User row */}
                <View style={styles.userRow}>
                    <View style={styles.avatar}>
                        {userImage
                            ? <Image source={{ uri: userImage }} style={styles.avatarImg} />
                            : <Text style={styles.avatarText}>{initials}</Text>
                        }
                    </View>
                    <Text style={styles.userName} numberOfLines={1}>{name}</Text>
                    <View style={styles.verifiedBadge}>
                        <Text style={{ fontSize: 8, color: '#fff' }}>✓</Text>
                    </View>
                </View>

                {/* Skill badge */}
                <View style={styles.badgeRow}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{title}</Text>
                    </View>
                </View>

                {/* Title & desc */}
                <Text style={styles.cardTitle} numberOfLines={2}>{description}</Text>

                {/* Bottom row */}
                <View style={styles.cardBottom}>
                    <View>
                        <Text style={styles.priceFrom}>Starting from</Text>
                        <Text style={styles.price}>{price ? `$${price}` : 'Contact'}</Text>
                    </View>
                    <TouchableOpacity style={styles.viewBtn} onPress={handleClick} activeOpacity={0.85}>
                        <Text style={styles.viewBtnText}>View Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default memo(GigCard);

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(255,255,255,0.80)',  // ← transparent white
        borderRadius: 16,
        marginBottom: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(14,165,233,0.15)',        // ← light blue border
    },
  imageContainer: {
        height: 160,
        backgroundColor: '#e5e7eb',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    ratingPill: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.55)',
        borderRadius: 20,
        paddingHorizontal: 9,
        paddingVertical: 4,
    },
    ratingText: {
        fontSize: 11,
        color: '#fff',
        fontWeight: '700',
    },
    saveBtn: {
        position: 'absolute',
        top: 10,
        left: 10,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(255,255,255,0.9)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        padding: 14,
        gap: 8,
    },
    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    avatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#dbeafe',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    avatarImg: {
        width: 28,
        height: 28,
        borderRadius: 14,
    },
    avatarText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#1e40af',
    },
    userName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#374151',
        flex: 1,
    },
    verifiedBadge: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#225b6b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeRow: {
        flexDirection: 'row',
        gap: 6,
    },
    badge: {
        backgroundColor: '#ccfbf1',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#0f766e',
        textTransform: 'uppercase',
        letterSpacing: 0.3,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#111827c7',
        lineHeight: 20,
    },
    cardBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    priceFrom: {
        fontSize: 10,
        color: '#9ca3af',
        fontWeight: '500',
    },
    price: {
        fontSize: 18,
        fontWeight: '800',
        color: '#111827',
    },
    viewBtn: {
        backgroundColor: '#225b6b',
        borderRadius: 10,
        paddingHorizontal: 18,
        paddingVertical: 10,
    },
    viewBtnText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#fff',
        letterSpacing: 0.2,
    },
});