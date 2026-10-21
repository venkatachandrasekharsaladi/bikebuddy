import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
type ButtonProps = { label: string; onPress: () => void; variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'; size?: 'md' | 'lg'; loading?: boolean; disabled?: boolean; style?: ViewStyle; accessibilityLabel?: string };
export function Button({ label, onPress, variant = 'primary', size = 'md', loading = false, disabled = false, style, accessibilityLabel }: ButtonProps) {
  const theme = useTheme();
  const background = variant === 'primary' ? theme.colors.primary : variant === 'destructive' ? theme.colors.danger : variant === 'secondary' ? theme.colors.surfaceAlt : 'transparent';
  const foreground = variant === 'primary' || variant === 'destructive' ? theme.colors.onPrimary : theme.colors.text;
  return <Pressable accessibilityRole="button" accessibilityLabel={accessibilityLabel ?? label} accessibilityState={{ disabled: disabled || loading, busy: loading }} disabled={disabled || loading} onPress={onPress} style={({ pressed }) => [styles.base, { minHeight: size === 'lg' ? 56 : theme.tapTarget, paddingHorizontal: size === 'lg' ? theme.spacing.xl : theme.spacing.lg, backgroundColor: background, borderColor: theme.colors.border, opacity: pressed || disabled ? 0.7 : 1 }, variant === 'ghost' && styles.ghost, style]}>{loading ? <ActivityIndicator color={foreground} /> : <Text allowFontScaling style={[styles.label, { color: foreground, fontFamily: theme.fontFamily }]}>{label}</Text>}</Pressable>;
}
const styles = StyleSheet.create({ base: { alignItems: 'center', justifyContent: 'center', borderRadius: 16, borderWidth: 1 }, ghost: { borderWidth: 0 }, label: { fontSize: 16, lineHeight: 24, fontWeight: '600' } });
