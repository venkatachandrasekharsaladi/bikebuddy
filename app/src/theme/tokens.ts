export const palette = {
  dark: { background: '#0F1115', surface: '#1A1D24', surfaceAlt: '#232733', border: 'rgba(255,255,255,0.08)', text: '#F4F5F7', textMuted: '#9AA1AE', primary: '#FF6B1A', onPrimary: '#14110F', success: '#22C55E', warning: '#F5B301', danger: '#EF4444', info: '#3B82F6', overlay: 'rgba(0,0,0,0.6)' },
  light: { background: '#F6F7F9', surface: '#FFFFFF', surfaceAlt: '#EEF0F4', border: 'rgba(0,0,0,0.08)', text: '#14161A', textMuted: '#5B6372', primary: '#E85A0C', onPrimary: '#14110F', success: '#16A34A', warning: '#B45309', danger: '#DC2626', info: '#2563EB', overlay: 'rgba(0,0,0,0.4)' },
} as const;
export type ColorScheme = keyof typeof palette;
export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32, huge: 48 } as const;
export const radius = { chip: 999, button: 16, card: 20, sheet: 28 } as const;
export const tapTarget = 48;
export const typography = { display: { fontSize: 32, lineHeight: 40, fontWeight: '700' }, h1: { fontSize: 26, lineHeight: 32, fontWeight: '700' }, h2: { fontSize: 20, lineHeight: 28, fontWeight: '600' }, h3: { fontSize: 17, lineHeight: 24, fontWeight: '600' }, body: { fontSize: 16, lineHeight: 24, fontWeight: '400' }, small: { fontSize: 14, lineHeight: 20, fontWeight: '400' }, caption: { fontSize: 12, lineHeight: 16, fontWeight: '500' } } as const;
export const motion = { micro: 150, standard: 250, emphasis: 400, explode: 700, spring: { damping: 15, stiffness: 150 } } as const;
export const shadow = { card: { shadowOpacity: 0.25, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 6 } } as const;
