import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '../../theme/useTheme';
export function Toast({ message, visible, onDismiss }: { message: string; visible: boolean; onDismiss: () => void }) {
  const theme = useTheme();
  useEffect(() => { if (!visible) return undefined; const timer = setTimeout(onDismiss, 3000); return () => clearTimeout(timer); }, [onDismiss, visible]);
  if (!visible) return null;
  return <Pressable accessibilityRole="alert" accessibilityLabel={message} onPress={onDismiss} style={[styles.toast, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}><Text allowFontScaling style={[styles.text, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>{message}</Text></Pressable>;
}
const styles = StyleSheet.create({ toast: { position: 'absolute', left: 16, right: 16, bottom: 24, minHeight: 48, padding: 14, borderRadius: 16, borderWidth: 1, justifyContent: 'center', elevation: 4 }, text: { fontSize: 14, lineHeight: 20, fontWeight: '600' } });
