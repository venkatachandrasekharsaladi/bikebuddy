import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from './Button';
import { useTheme } from '../../theme/useTheme';
export function EmptyState({ title, message, actionLabel, onAction }: { title: string; message: string; actionLabel?: string; onAction?: () => void }) {
  const theme = useTheme();
  return <View accessibilityRole="text" style={styles.container}><Text allowFontScaling style={[styles.title, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>{title}</Text><Text allowFontScaling style={[styles.message, { color: theme.colors.textMuted, fontFamily: theme.fontFamily }]}>{message}</Text>{actionLabel && onAction ? <Button label={actionLabel} onPress={onAction} /> : null}</View>;
}
const styles = StyleSheet.create({ container: { alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 }, title: { fontSize: 20, lineHeight: 28, fontWeight: '600', textAlign: 'center' }, message: { fontSize: 16, lineHeight: 24, textAlign: 'center', maxWidth: 320 } });
