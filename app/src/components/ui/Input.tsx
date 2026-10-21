import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
export function Input({ label, error, helperText, ...props }: TextInputProps & { label: string; error?: string; helperText?: string }) {
  const theme = useTheme();
  return <View style={styles.wrapper}><Text allowFontScaling style={[styles.label, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>{label}</Text><TextInput accessibilityLabel={props.accessibilityLabel ?? label} placeholderTextColor={theme.colors.textMuted} {...props} style={[styles.input, { backgroundColor: theme.colors.surface, borderColor: error ? theme.colors.danger : theme.colors.border, color: theme.colors.text, fontFamily: theme.fontFamily }, props.style]} />{error ? <Text allowFontScaling accessibilityRole="alert" style={[styles.help, { color: theme.colors.danger }]}>{error}</Text> : helperText ? <Text allowFontScaling style={[styles.help, { color: theme.colors.textMuted }]}>{helperText}</Text> : null}</View>;
}
const styles = StyleSheet.create({ wrapper: { gap: 8 }, label: { fontSize: 14, lineHeight: 20, fontWeight: '600' }, input: { minHeight: 48, borderWidth: 1, borderRadius: 16, paddingHorizontal: 16, fontSize: 16 }, help: { fontSize: 12, lineHeight: 16 } });
