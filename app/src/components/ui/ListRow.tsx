import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
export function ListRow({ title, subtitle, leading, trailing, onPress, accessibilityLabel }: { title: string; subtitle?: string; leading?: React.ReactNode; trailing?: React.ReactNode; onPress?: () => void; accessibilityLabel?: string }) {
  const theme = useTheme();
  const content = <><View style={styles.leading}>{leading}</View><View style={styles.copy}><Text allowFontScaling numberOfLines={1} style={[styles.title, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>{title}</Text>{subtitle ? <Text allowFontScaling numberOfLines={2} style={[styles.subtitle, { color: theme.colors.textMuted, fontFamily: theme.fontFamily }]}>{subtitle}</Text> : null}</View><View style={styles.trailing}>{trailing}</View></>;
  return onPress ? <Pressable accessibilityRole="button" accessibilityLabel={accessibilityLabel ?? title} onPress={onPress} style={({ pressed }) => [styles.row, { borderBottomColor: theme.colors.border, opacity: pressed ? 0.7 : 1 }]}>{content}</Pressable> : <View style={[styles.row, { borderBottomColor: theme.colors.border }]}>{content}</View>;
}
const styles = StyleSheet.create({ row: { minHeight: 64, flexDirection: 'row', alignItems: 'center', gap: 12, borderBottomWidth: 1, paddingVertical: 8 }, leading: { minWidth: 32, alignItems: 'center' }, copy: { flex: 1, gap: 2 }, trailing: { alignItems: 'flex-end' }, title: { fontSize: 16, lineHeight: 24, fontWeight: '600' }, subtitle: { fontSize: 14, lineHeight: 20 } });
