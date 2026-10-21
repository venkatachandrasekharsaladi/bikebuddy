import { useColorScheme } from 'react-native';
import { palette, spacing, radius, typography, motion, shadow, tapTarget, ColorScheme } from './tokens';

export function useTheme() {
  const scheme: ColorScheme = useColorScheme() === 'light' ? 'light' : 'dark';
  return { scheme, colors: palette[scheme], spacing, radius, typography, motion, shadow, tapTarget };
}
