import { useState } from 'react';
import React, { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/use-apply-project';
import { setOrder } from '@/store/slices/order-details-slice';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckCircle2, Clock, RotateCcw, XCircle } from 'lucide-react-native';

const ACCENT = '#0d9488';
const BORDER = 'rgba(14,165,233,0.18)';
const TEXT_PRIMARY = '#0f172a';
const TEXT_SECONDARY = '#6b7280';

function GigPricing({ packagesDetails }: any) {
    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useState('Basic');

    const selectedPackage = packagesDetails?.find(
        (pkg: any) => pkg?.packageType?.toLowerCase() === activeTab.toLowerCase()
    );

    const features = selectedPackage?.packages ? JSON.parse(selectedPackage.packages) : {};

    useEffect(() => {
        if (selectedPackage) dispatch(setOrder(selectedPackage));
    }, [activeTab]);

    if (!selectedPackage) return null;

    return (
        <View style={styles.pricingCard}>

            {/* Tab Bar */}
            <View style={styles.tabBar}>
                {['Basic', 'Standard', 'Premium'].map((item) => (
                    <TouchableOpacity
                        key={item}
                        style={[styles.tab, activeTab === item && styles.activeTab]}
                        onPress={() => {
                            setActiveTab(item);
                            const newPkg = packagesDetails?.find(
                                (pkg: any) => pkg?.packageType?.toLowerCase() === item.toLowerCase()
                            );
                            if (newPkg) dispatch(setOrder(newPkg));
                        }}
                    >
                        <Text style={[styles.tabText, activeTab === item && styles.activeTabText]}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.pricingContent}>

                {/* Price Header */}
                <View style={styles.priceHeader}>
                    <View style={styles.priceTitleBlock}>
                        <Text style={styles.priceTitle} numberOfLines={1}>{activeTab} Package</Text>
                        <Text style={styles.vendorName} numberOfLines={2}>{selectedPackage?.packageName}</Text>
                    </View>
                    <View style={styles.priceBadge}>
                        <Text style={styles.priceCurrency}>$</Text>
                        <Text style={styles.priceValue}>{selectedPackage?.price}</Text>
                    </View>
                </View>

                {/* Description */}
                <Text style={styles.vendorSub}>{selectedPackage?.packageDescription}</Text>

                {/* Stats Row — 3 separate cards */}
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <View style={styles.statIcon}>
                            <Clock size={14} color={ACCENT} />
                        </View>
                        <Text style={styles.statLabel}>Concepts</Text>
                        <Text style={styles.statValue}>{features?.concepts ?? '-'}</Text>
                    </View>

                    <View style={styles.statItem}>
                        <View style={styles.statIcon}>
                            <Clock size={14} color={ACCENT} />
                        </View>
                        <Text style={styles.statLabel}>Delivery</Text>
                        <Text style={styles.statValue}>{selectedPackage?.deliveryTime ?? '-'}d</Text>
                    </View>

                    <View style={styles.statItem}>
                        <View style={styles.statIcon}>
                            <RotateCcw size={14} color={ACCENT} />
                        </View>
                        <Text style={styles.statLabel}>Revisions</Text>
                        <Text style={styles.statValue}>{selectedPackage?.revisions ?? '-'}</Text>
                    </View>
                </View>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Features */}
                <Text style={styles.featuresLabel}>What's included</Text>
                {Object.entries(features).map(([key, value], index) => (
                    <View key={index} style={styles.featureItem}>
                        {value
                            ? <CheckCircle2 size={18} color={ACCENT} fill="rgba(13,148,136,0.12)" />
                            : <XCircle size={18} color="#d1d5db" />
                        }
                        <Text style={[styles.featureText, !value && styles.featureTextDisabled]} numberOfLines={2}>
                            {key.replaceAll('_', ' ')}
                        </Text>
                    </View>
                ))}

            </View>
        </View>
    );
}

export default GigPricing;

const styles = StyleSheet.create({
    pricingCard: {
        backgroundColor: 'rgba(255,255,255,0.92)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: BORDER,
        overflow: 'hidden',
        marginBottom: 20,
        alignSelf: 'stretch',
    },

    // Tab Bar
    tabBar: {
        flexDirection: 'row',
        backgroundColor: 'rgba(14,165,233,0.07)',
        borderBottomWidth: 1,
        borderBottomColor: BORDER,
    },
    tab: {
        flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
        borderBottomWidth: 2.5,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        backgroundColor: 'rgba(255,255,255,0.90)',
        borderBottomColor: ACCENT,
    },
    tabText: {
        fontSize: 13,
        fontWeight: '600',
        color: TEXT_SECONDARY,
    },
    activeTabText: {
        color: ACCENT,
        fontWeight: '700',
    },

    // Content
    pricingContent: {
        padding: 16,
    },

    // Price Header
    priceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
        gap: 10,
    },
    priceTitleBlock: {
        flex: 1,
        minWidth: 0,
    },
    priceTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: TEXT_PRIMARY,
        marginBottom: 3,
    },
    vendorName: {
        fontSize: 13,
        fontWeight: '600',
        color: TEXT_SECONDARY,
    },
    priceBadge: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(13,148,136,0.10)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(13,148,136,0.20)',
        flexShrink: 0,
    },
    priceCurrency: {
        fontSize: 13,
        fontWeight: '700',
        color: ACCENT,
        marginTop: 3,
    },
    priceValue: {
        fontSize: 22,
        fontWeight: '800',
        color: ACCENT,
        lineHeight: 28,
    },
    vendorSub: {
        fontSize: 13,
        color: TEXT_SECONDARY,
        lineHeight: 20,
        marginBottom: 14,
    },

    // Stats — 3 separate card boxes
    statsRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 16,
    },
    statItem: {
        flex: 1,
        backgroundColor: 'rgba(14,165,233,0.06)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: BORDER,
        padding: 10,
        alignItems: 'center',
        gap: 4,
        minWidth: 0,
    },
    statIcon: {
        width: 30,
        height: 30,
        borderRadius: 8,
        backgroundColor: 'rgba(13,148,136,0.10)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 2,
    },
    statLabel: {
        fontSize: 10,
        fontWeight: '600',
        color: TEXT_SECONDARY,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        textAlign: 'center',
    },
    statValue: {
        fontSize: 15,
        fontWeight: '800',
        color: TEXT_PRIMARY,
        textAlign: 'center',
    },

    // Features
    divider: {
        height: 1,
        backgroundColor: BORDER,
        marginBottom: 14,
    },
    featuresLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: TEXT_SECONDARY,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        marginBottom: 12,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        marginBottom: 11,
        minWidth: 0,
    },
    featureText: {
        fontSize: 14,
        color: TEXT_PRIMARY,
        fontWeight: '500',
        textTransform: 'capitalize',
        flex: 1,
        flexWrap: 'wrap',
    },
    featureTextDisabled: {
        color: '#d1d5db',
    },
});