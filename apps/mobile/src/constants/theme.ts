/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#1C1C18',
    background: '#FBF8F3',
    backgroundElement: '#ECE4D9',
    backgroundSelected: '#DFD3C3',
    textSecondary: '#6B6459',
  },
  dark: {
    text: '#F5F1E8',
    background: '#14201A',
    backgroundElement: '#1E2C24',
    backgroundSelected: '#28392F',
    textSecondary: '#B7B0A2',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

/** Secondary accent — small highlights only (search action, step progress). Not the primary CTA color. */
export const Brand = '#A85D3F';

/** Nav / primary brand color — tab bar, headers, and primary CTAs. Constant across light/dark. */
export const NavBrand = '#1B4433';

/** "Verified" signal — kept visually distinct from Brand so trust reads as special. */
export const TrustBadge = {
  bg: '#DCF0E1',
  text: '#16A34A',
} as const;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
