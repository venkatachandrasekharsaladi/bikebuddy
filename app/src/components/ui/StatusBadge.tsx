import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
type Status = 'on-time' | 'due-soon' | 'overdue' | 'normal' | 'check' | 'unnecessary';
const labels: Record<Status, string> = { 'on-time': 'On time', 'due-soon': 'Due soon', overdue: 'Overdue', normal: 'Normal', check: 'Check this', unnecessary: 'Possibly unnecessary' };
export function StatusBadge({ status, label }: { status: Status; label?: string }) { const theme = useTheme(); const color = status === 'on-time' || status === 'normal' ? theme.colors.success : status === 'due-soon' || status === 'check' ? theme.colors.warning : theme.colors.danger; return <View accessibilityRole="text" accessibilityLabel={label ?? labels[status]} style={[styles.badge, { backgroundColor: `${color}22` }]}><Text allowFontScaling style={[styles.text, { color, fontFamily: theme.fontFamily }]}>{label ?? labels[status]}</Text></View>; }
const styles = StyleSheet.create({ badge: { minHeight: 32, paddingHorizontal: 10, borderRadius: 999, justifyContent: 'center', alignSelf: 'flex-start' }, text: { fontSize: 12, lineHeight: 16, fontWeight: '600' } });
