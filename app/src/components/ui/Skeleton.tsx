import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
export function Skeleton({ width = '100%', height = 20, style }: { width?: number | `${number}%`; height?: number; style?: ViewStyle }) { const theme = useTheme(); return <View accessibilityLabel="Loading" style={[styles.base, { width, height, backgroundColor: theme.colors.surfaceAlt }, style]} />; }
const styles = StyleSheet.create({ base: { borderRadius: 8, opacity: 0.8 } });
