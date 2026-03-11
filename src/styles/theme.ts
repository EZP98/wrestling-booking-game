export const COLORS = {
  bg: '#070710',
  bgCard: '#0d0d1a',
  bgHover: '#111128',
  bgPanel: '#09091a',
  border: '#1a1a2e',
  borderLight: '#2a2a4e',
  gold: '#B8860B',
  goldLight: '#F1C40F',
  red: '#E74C3C',
  redDark: '#922B21',
  blue: '#3498DB',
  blueDark: '#1B4F72',
  green: '#2ECC71',
  greenDark: '#1B6B3A',
  purple: '#8E44AD',
  orange: '#FF6B35',
  text: '#e0e0e0',
  textMuted: '#888888',
  textDark: '#555555',
  white: '#ffffff',
  black: '#000000',
};

export const TIER_COLORS: Record<string, string> = {
  'MEGA-EVENTO': COLORS.red,
  'LEGGENDARIO': COLORS.red,
  'ICONIC': COLORS.goldLight,
  'CALDO': COLORS.orange,
  'PREMIUM': COLORS.blue,
  'STANDARD': COLORS.green,
};

export const BRAND_COLORS: Record<string, string> = {
  Raw: '#C0392B',
  SmackDown: '#2471A3',
  NXT: '#F1C40F',
  AEW: '#F39C12',
  TNA: '#27AE60',
  ROH: '#8E44AD',
  AAA: '#E74C3C',
  'Free Agent': '#7F8C8D',
};

export const ALIGNMENT_COLORS: Record<string, string> = {
  Face: COLORS.blue,
  Heel: COLORS.red,
  Tweener: COLORS.goldLight,
};

export const STATUS_COLORS: Record<string, string> = {
  'Full Time': COLORS.green,
  'Part Time': COLORS.blue,
  'Part Time Legend': COLORS.gold,
  'Legend Speciale': COLORS.goldLight,
  'Returned': COLORS.purple,
  'Retired/Return': COLORS.textMuted,
  'Injured': COLORS.red,
  'NXT': COLORS.goldLight,
  'Free Agent': COLORS.textDark,
};
