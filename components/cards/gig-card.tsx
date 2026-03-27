import { Image, StyleSheet, Text, View } from 'react-native';
import ButtonRN from '../ui/button';
import React, { memo } from 'react';

const GigCard = ({ userImage, name, title, description, fileUrl, handleClick }: any) => {
    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: fileUrl }} style={styles.image} />
                <View style={styles.profileBadge}>
                    <Image source={{ uri: userImage }} style={styles.profile} />
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.name} numberOfLines={1}>{name}</Text>
                    <View style={styles.titleBadge}>
                        <Text style={styles.title} numberOfLines={1}>{title}</Text>
                    </View>
                </View>
                <Text numberOfLines={2} style={styles.desc}>
                    {description}
                </Text>
                <ButtonRN isLoading={false} handleClick={handleClick}>
                    <Text style={styles.buttonText}>View</Text>
                </ButtonRN>
            </View>
        </View>
    );
}
export default memo(GigCard);

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 12,
        marginHorizontal: 3,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
    },
    imageContainer: {
        position: 'relative',
        height: 140,
        backgroundColor: '#f3f4f6',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    profileBadge: {
        position: 'absolute',
        bottom: -16,
        left: 12,
        borderRadius: 18,
        borderWidth: 2.5,
        borderColor: '#FFFFFF',
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 4,
    },
    profile: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    content: {
        padding: 12,
        paddingTop: 20,
        gap: 8,
    },
    header: {
        gap: 4,
    },
    name: {
        fontWeight: '700',
        fontSize: 15,
        color: '#111827',
        letterSpacing: -0.2,
    },
    titleBadge: {
        alignSelf: 'flex-start',
        backgroundColor: '#d1fae5',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    title: {
        fontSize: 11,
        color: '#059669',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.3,
    },
    desc: {
        fontSize: 13,
        color: '#6b7280',
        lineHeight: 18,
        letterSpacing: -0.1,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14,
        letterSpacing: 0.2,
    },
});