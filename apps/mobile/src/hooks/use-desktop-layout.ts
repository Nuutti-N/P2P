import { Platform, useWindowDimensions } from 'react-native';

import { MaxContentWidth } from '@/constants/theme';

/** Viewport width, web-only, above which the top nav replaces the bottom tab bar. */
export const DesktopBreakpoint = 900;

/** Wider content column used once there's room for a real desktop layout. */
export const DesktopContentWidth = 1200;

export function useIsDesktopWeb(): boolean {
  const { width } = useWindowDimensions();
  return Platform.OS === 'web' && width >= DesktopBreakpoint;
}

export function useContentMaxWidth(): number {
  return useIsDesktopWeb() ? DesktopContentWidth : MaxContentWidth;
}
