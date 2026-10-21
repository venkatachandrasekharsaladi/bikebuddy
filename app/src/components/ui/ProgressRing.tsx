import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '../../theme/useTheme';
export function ProgressRing({ progress, size = 96, label }: { progress: number; size?: number; label?: string }) {
  const theme = useTheme();
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const value = Math.min(1, Math.max(0, progress));
  return <View accessible accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: Math.round(value * 100) }} style={{ width: size, height: size }}><Svg width={size} height={size} rotation="-90"><Circle cx={size / 2} cy={size / 2} r={radius} stroke={theme.colors.surfaceAlt} strokeWidth={stroke} fill="none" /><Circle cx={size / 2} cy={size / 2} r={radius} stroke={theme.colors.primary} strokeWidth={stroke} strokeDasharray={`${circumference} ${circumference}`} strokeDashoffset={circumference * (1 - value)} strokeLinecap="round" fill="none" /></Svg><View style={styles.center}><Text allowFontScaling style={[styles.value, { color: theme.colors.text, fontFamily: theme.fontFamily }]}>{Math.round(value * 100)}%</Text>{label ? <Text allowFontScaling style={[styles.label, { color: theme.colors.textMuted, fontFamily: theme.fontFamily }]}>{label}</Text> : null}</View></View>;
}
const styles = StyleSheet.create({ center: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, alignItems: 'center', justifyContent: 'center' }, value: { fontSize: 20, fontWeight: '700' }, label: { fontSize: 12, lineHeight: 16 } });
