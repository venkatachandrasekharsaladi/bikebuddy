import { useFonts } from 'expo-font';
import React, { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { ColorScheme, palette, spacing, radius, typography, motion, shadow, tapTarget } from './tokens';

export type Theme = {
  scheme: ColorScheme;
  colors: (typeof palette)[ColorScheme];
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
  motion: typeof motion;
  shadow: typeof shadow;
  tapTarget: typeof tapTarget;
  fontFamily: string;
};

const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({ children, forcedScheme }: PropsWithChildren<{ forcedScheme?: ColorScheme }>) {
  const systemScheme = useColorScheme();
  const scheme: ColorScheme = forcedScheme ?? (systemScheme === 'light' ? 'light' : 'dark');
  const [fontsLoaded] = useFonts({
    Inter: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTcviYwY.woff2',
  });
  const theme = useMemo<Theme>(() => ({
    scheme,
    colors: palette[scheme],
    spacing,
    radius,
    typography,
    motion,
    shadow,
    tapTarget,
    fontFamily: fontsLoaded ? 'Inter' : 'System',
  }), [fontsLoaded, scheme]);

  if (!fontsLoaded) {
    return (
      <View style={[styles.loading, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator color={theme.colors.primary} accessibilityLabel="Loading BikeBuddy" />
        <Text style={[styles.loadingText, { color: theme.colors.textMuted }]}>Getting BikeBuddy ready…</Text>
      </View>
    );
  }

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useThemeContext must be used inside ThemeProvider');
  }
  return theme;
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  loadingText: { fontSize: 14, lineHeight: 20 },
});
