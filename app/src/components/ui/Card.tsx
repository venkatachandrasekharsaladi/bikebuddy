import React, { PropsWithChildren } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
export function Card({ children, style }: PropsWithChildren<{ style?: ViewStyle }>) { const theme = useTheme(); return <View style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, shadowColor: theme.colors.text }, style]}>{children}</View>; }
const styles = StyleSheet.create({ card: { borderRadius: 20, borderWidth: 1, padding: 16, shadowOpacity: 0.12, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 3 } });
